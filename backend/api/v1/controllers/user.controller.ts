import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import {
  generateRandomNumber,
  generateRandomString,
} from "../../../helpers/generate.helper";
import ForgotPassword from "../models/forgot-password.model";
import { sendMail } from "../../../helpers/send-mail.helper";
import Mentors from "../models/mentor.model";
// [POST] /api/v1/users/register
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

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const user = await User.findOne({
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
    user: user,
  });
};

// [GET] /api/v1/users/detail
export const detail = async (req: Request, res: Response) => {
  try {
    const infoUser = res.locals.user;
    const mentorIds = infoUser.mentorIds.map((mentor) => mentor.mentorId);
    const mentorDetails = await Promise.all(
      mentorIds.map((mentorId) =>
        Mentors.findOne({ _id: mentorId }).select("-id")
      )
    );
    const saveMentorIds = infoUser.saveMentorIds.map(
      (mentor) => mentor.mentorId
    );
    const saveMentorDetails = await Promise.all(
      saveMentorIds.map((mentorId) =>
        Mentors.findOne({ _id: mentorId }).select("-id")
      )
    );
    res.json({
      code: 200,
      message: "Thành công!",
      info: res.locals.user,
      infoMentors: mentorDetails,
      saveInfoMentors: saveMentorDetails,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
      message: "Không thành công",
    });
  }
};

// [POST] /api/v1/users/update // thuan check lai cho t cai nay nhe, t đi copy code thử thôi
export const updateUser = async (req: Request, res: Response) => {
  const {
    name,
    school,
    studentId,
    email,
    number,
    avatar,
    mentorId,
    saveMentorId,
  } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  console.log(req.body.name);
  console.log(req.body.school);
  console.log(req.body.avatar);
  try {
    if (mentorId && saveMentorId) {
      var updatedUser = await User.findOneAndUpdate(
        { token: token },
        {
          name,
          school,
          studentId,
          email,
          avatar,
          number,
          $push: {
            mentorIds: { mentorId: mentorId },
            saveMentorIds: { mentorId: saveMentorId },
          },
        },
        { new: true }
      );
      res.json({
        code: 200,
        message: "Cập nhật thông tin thành công!",
        user: updatedUser,
      });
      return;
    } else if (saveMentorId) {
      var updatedUser = await User.findOneAndUpdate(
        { token: token },
        {
          name,
          school,
          studentId,
          email,
          avatar,
          number,
          $push: {
            saveMentorIds: { mentorId: saveMentorId },
          },
        },
        { new: true }
      );
    } else if (mentorId) {
      var updatedUser = await User.findOneAndUpdate(
        { token: token },
        {
          name,
          school,
          studentId,
          email,
          avatar,
          number,
          $push: {
            mentorIds: { mentorId: mentorId },
          },
        },
        { new: true }
      );
    } else {
      var updatedUser = await User.findOneAndUpdate(
        { token: token },
        {
          name,
          school,
          studentId,
          avatar,
          email,
          number,
        },
        { new: true }
      );
    }

    res.json({
      code: 200,
      message: "Cập nhật thông tin thành công!",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
      message: "Cập nhật thông tin không thành công!",
    });
  }
};

// [POST] api/v1/users/password/forgot
export const forgotPasswordPost = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await User.findOne({
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
  const otp = generateRandomNumber(6);
  // Việc 1: Lưu thông tin vào database
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiresAt: Date.now() + 1,
  };

  const record = new ForgotPassword(objectForgotPassword);
  await record.save();

  // Việc 2: Gửi mã OTP qua email
  const subject = `Mã OTP lấy lại lại mật khẩu`;
  const content = `Mã OTP của bạn là <b>${otp}</b>. Vui lòng không chia sẻ với bất cứ ai. Mã OTP sẽ hết hạn trong 1 phút, nếu quá một phút vui lòng điền lại email !`;

  sendMail(email, subject, content);
  res.json({
    code: 200,
    message: "Đã gửi OTP",
  });
};
// [POST] api/v1/users/password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const find = {
    email: email,
    otp: otp,
  };
  const result = await ForgotPassword.findOne(find);
  if (!result) {
    res.json({
      code: 400,
      message: "OTP không hợp lệ!",
    });
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  res.json({
    code: 200,
    token: user.token,
  });
};

// [POST] api/v1/users/password/reset
export const resetPasswordPost = async (req: Request, res: Response) => {
  const password = req.body.password;
  const tokenUser: string = req.headers.authorization.split(" ")[1];
  try {
    await User.updateOne(
      {
        tokenUser: tokenUser,
      },
      {
        password: md5(password),
      }
    );
    res.json({
      code: 200,
      message: "Lấy lại mật khẩu thành công !",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lấy lại mật khẩu không thành công !",
    });
    console.log(error);
  }
};
// [DELETE] api/v1/users/deleteSaveMentor/:id
export const deleteSaveMentor = async (req: Request, res: Response) => {
  const idMentor = req.params.id;
  const tokenUser: string = req.headers.authorization.split(" ")[1];
  try {
    const result = await User.updateOne(
      {
        token: tokenUser,
      },
      {
        $pull: { saveMentorIds: { mentorId: idMentor } },
      }
    );
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Đã xóa lưu mentor",
      });
    } else {
      res.json({
        code: 404,
        message: "Mentor không tồn tại hoặc đã được xóa",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Xóa lưu mentor không thành công!",
    });
    console.error(error);
  }
};
