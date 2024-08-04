import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomString } from "../../../helpers/generate.helper";
import Mentors from "../models/mentor.model";
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
  const limitNumber = req.body.limit;
  const skipNumber = (req.body.page - 1) * limitNumber;
  const listMentor = await Mentors.find().limit(limitNumber).skip(skipNumber);
  res.json({
    code: 200,
    user: listMentor,
  });
};
