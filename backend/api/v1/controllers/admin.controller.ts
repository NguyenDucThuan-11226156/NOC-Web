import { Request, Response } from "express";
import md5 from "md5";
import { generateRandomString } from "../../../helpers/generate.helper";
import Admin from "../models/admin.model";
import Enterprise from "../models/enterprise.model";
import Study from "../models/study.model";
import Domain from "../models/domain.model";
import Specialization from "../models/specialization.model";
// [POST] /api/v1/admin/register
export const register = async (req: Request, res: Response) => {
  try {
    const emailExist = await Admin.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      res.json({
        code: 400,
        message: "Email đã tồn tại !",
      });
    } else {
      req.body.password = md5(req.body.password);
      req.body.token = generateRandomString(30);
      const user = new Admin(req.body);
      const data = await user.save();
      const token = data.token;
      res.json({
        code: 200,
        message: "Tạo tài khoản thành công !",
        token: token,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo tài khoản thất bại !",
    });
  }
};
// [POST] /api/v1/admin/login
export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await Admin.findOne({
      email: email,
      deleted: false,
    });
    if (!user) {
      res.json({
        code: 400,
        message: "Email không tồn tại!",
      });
      return;
    }

    if (md5(password) !== user.password) {
      res.json({
        code: 400,
        message: "Sai mật khẩu!",
      });
      return;
    }
    const token = user.token;
    res.json({
      code: 200,
      message: "Đăng nhập thành công!",
      token: token,
      admin: user,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập thất bại!",
    });
  }
};
// [GET] /api/v1/admin/listCategory
export const listCategory = async (req: Request, res: Response) => {
  try {
    const listAllEnterprise = await Enterprise.find();
    const listAllStudy = await Study.find();
    const listAllDomain = await Domain.find();
    const listAllSpecialization = await Specialization.find();
    res.json({
      code: 200,
      enterprises: listAllEnterprise,
      studies: listAllStudy,
      domains: listAllDomain,
      specialization: listAllSpecialization,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đã xảy ra lỗi !",
    });
  }
};
// [POST] /api/v1/admin/createCategory
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newEnterprise = req.body.enterprise;
    const newStudy = req.body.study;
    const newDomain = req.body.domain;
    const newSpecialization = req.body.specialization;
    if (newEnterprise) {
      const enterprise = new Enterprise({
        description: newEnterprise,
      });
      const data = await enterprise.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
    if (newStudy) {
      const study = new Study({
        description: newStudy,
      });
      const data = await study.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
    if (newDomain) {
      const domain = new Domain({
        description: newDomain,
      });
      const data = await domain.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
    if (newSpecialization) {
      const specialization = new Specialization({
        description: newSpecialization,
      });
      const data = await specialization.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Đã xảy ra lỗi !",
    });
  }
};
