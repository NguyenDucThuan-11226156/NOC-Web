import { Request, Response } from "express";
import md5 from "md5";
import { generateRandomString } from "../../../helpers/generate.helper";
import Domain from "../models/domain.model";
import Enterprise from "../models/enterprise.model";
import Mentors from "../models/mentor.model";
import Specialization from "../models/specialization.model";
import Study from "../models/study.model";
import User from "../models/user.model";
// [POST] /api/v1/mentors/register
export const register = async (req: Request, res: Response) => {
  try {
    const emailExist = await User.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    } else {
      req.body.password = md5(req.body.password);
      req.body.token = generateRandomString(30);
      const user = new User(req.body);
      const data = await user.save();
      const token = data.token;
      res.json({
        code: 200,
        message: "Tạo tài khoản thành công!",
        token: token,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo tài thất bại!",
    });
  }
};
// [POST] /api/v1/mentors/list
export const listMentors = async (req: Request, res: Response) => {
  try {
    const limitNumber = req.body.limit;
    const skipNumber = (req.body.page - 1) * limitNumber;
    const listMentor = await Mentors.find().limit(limitNumber).skip(skipNumber);
    const pinnedMentor = await Mentors.find({
      pinned: true,
    });
    const listAllMentors = await Mentors.find();
    const listAllEnterprise = await Enterprise.find();
    const listAllStudy = await Study.find();
    const listAllDomain = await Domain.find();
    const listAllSpecialization = await Specialization.find();
    const total = listAllMentors.length;
    res.json({
      code: 200,
      mentors: listMentor,
      pinnedMentor: pinnedMentor,
      total: total,
      enterprises: listAllEnterprise,
      studies: listAllStudy,
      domains: listAllDomain,
      specialization: listAllSpecialization,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
};
// [POST] /api/v1/mentors/filter
export const filterMentors = async (req: Request, res: Response) => {
  try {
    const name = req.body.keyword || null;
    const enterprise = req.body.organization || null;
    const specialization = req.body.specialization || null;
    const study = req.body.education || null;
    const domain = req.body.industry || null;
    const find = {
      // deleted: false,
    };
    if (name) {
      const regex = new RegExp(name, "i");
      find["name"] = regex;
    }
    if (enterprise) {
      find["organization"] = new RegExp(enterprise, "i");
    }
    if (specialization) {
      find["specialization"] = new RegExp(specialization, "i");
    }
    if (study) {
      find["education"] = new RegExp(study, "i");
    }
    if (domain) {
      find["industry"] = new RegExp(domain, "i");
    }
    const limitNumber = req.body.limit;
    const skipNumber = (req.body.page - 1) * limitNumber;
    const listMentor = await Mentors.find(find)
      .limit(limitNumber)
      .skip(skipNumber);
    const listAllMentors = await Mentors.find(find);
    const total = listAllMentors.length;
    res.json({
      code: 200,
      mentors: listMentor,
      total: total,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
};
// [POST] /api/v1/mentors/create
export const createMentor = async (req: Request, res: Response) => {
  try {
    const mentor = new Mentors({
      name: req.body.name,
      avatar: req.body["avatar"][0],
      introduction1: req.body.introduction1,
      introduction2: req.body.introduction2,
      organization: req.body.organization,
      specialization: req.body.specialization,
      education: req.body.education,
      industry: req.body.industry,
      companyLogo: req.body["companyLogo"][0],
      experience: req.body.experience,
      field: req.body.field,
    });
    const data = await mentor.save();
    res.json({
      code: 200,
      data: data,
      message: "Tạo mentor thành công !",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
};
// [DELETE] /api/v1/mentors/delete/:id
export const deleteMentor = async (req: Request, res: Response) => {
  try {
    const idMentor = req.params.id;
    await Mentors.deleteOne({
      _id: idMentor,
    });
    // Remove the mentor reference from all users
    await User.updateMany(
      {},
      {
        $pull: { saveMentorIds: idMentor },
      }
    );
    res.json({
      code: 200,
      message: "Xóa mentor thành công !",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
};
// [POST] /api/v1/mentors/update/:id
export const updateMentor = async (req: Request, res: Response) => {
  try {
    const idMentor = req.params.id;
    await Mentors.updateOne(
      {
        _id: idMentor,
      },
      {
        name: req.body.name,
        avatar: req.body.avatar,
        introduction1: req.body.introduction1,
        introduction2: req.body.introduction2,
        organization: req.body.organization,
        specialization: req.body.specialization,
        education: req.body.education,
        industry: req.body.industry,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhật mentor thành công !",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
};
// [POST] /api/v1/mentors/detail/:id
export const detailMentor = async (req: Request, res: Response) => {
  try {
    const idMentor = req.params.id;
    const infoMentor = await Mentors.find({
      _id: idMentor,
    });
    res.json({
      mentor: infoMentor,
      code: 200,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
};
