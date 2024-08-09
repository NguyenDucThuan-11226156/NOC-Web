import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomString } from "../../../helpers/generate.helper";
import Mentors from "../models/mentor.model";
import Enterprise from "../models/enterprise.model";
import Study from "../models/study.model";
import Domain from "../models/domain.model";
import Specialization from "../models/specialization.model";
// [POST] /api/v1/mentors/register
export const register = async (req: Request, res: Response) => {
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
};
// [POST] /api/v1/mentors
export const listMentors = async (req: Request, res: Response) => {
  try {
    const limitNumber = req.body.limit;
    const skipNumber = (req.body.page - 1) * limitNumber;
    const listMentor = await Mentors.find().limit(limitNumber).skip(skipNumber);
    const listAllMentors = await Mentors.find();
    const listAllEnterprise = await Enterprise.find();
    const listAllStudy = await Study.find();
    const listAllDomain = await Domain.find();
    const listAllSpecialization = await Specialization.find();
    const total = listAllMentors.length;
    res.json({
      code: 200,
      mentors: listMentor,
      total: total,
      enterprises: listAllEnterprise,
      studies: listAllStudy,
      domains: listAllDomain,
      specialization: listAllSpecialization,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
    });
  }
};
// [POST] /api/v1/filter
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
      find["organization"] = enterprise;
    }
    if (specialization) {
      find["specialization"] = specialization;
    }
    if (study) {
      find["education"] = study;
    }
    if (domain) {
      find["field"] = domain;
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
    console.log(error);
    res.json({
      code: 400,
      message: error,
    });
  }
};
