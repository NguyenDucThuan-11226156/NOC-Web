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
import Users from "../models/user.model";
// [POST] /api/v1/users/register
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
      message: "Tạo tài khoản không thành công!",
    });
  }
};

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập không thành công!",
    });
  }
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
// [GET] /api/v1/users/detailPure
export const detailPure = async (req: Request, res: Response) => {
  try {
    res.json({
      code: 200,
      message: "Thành công!",
      info: res.locals.user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
      message: "Không thành công",
    });
  }
};
// [POST] /api/v1/users/update
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
  try {
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
  } catch (error) {
    res.json({
      code: 400,
      message: "Không gửi được OTP",
    });
  }
};
// [POST] api/v1/users/password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.json({
      code: 400,
    });
  }
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
// [POST] api/v1/users/applyNow/:mentorId
export const applyNow = async (req: Request, res: Response) => {
  try {
    const {
      _id,
      email,
      field,
      fullName,
      introduction,
      issueDescription,
      domain,
      phone,
      school,
      studentID,
      cv,
    } = req.body;
    const newMentee = {
      userId: _id, // Placeholder for actual user ID
      name: fullName,
      school,
      domain,
      studentId: studentID,
      number: phone,
      email,
      introduction,
      field,
      issueDescription,
      cv: {
        url: cv.url,
        originalFilename: cv.originalFilename,
      },
    };

    const mentorId = req.params.mentorId;
    // Add the new mentee
    const updateResult = await Mentors.updateOne(
      { _id: mentorId },
      { $push: { mentees: newMentee } }
    );

    if (updateResult.modifiedCount > 0) {
      // Calculate the new mentee count
      const mentor = await Mentors.findOne({ _id: mentorId }).select("mentees");

      if (mentor) {
        const newMenteeCount = mentor.mentees.length;

        // Update mentee count
        await Mentors.updateOne(
          { _id: mentorId },
          { menteeCount: newMenteeCount }
        );

        var updatedUser = await User.findOneAndUpdate(
          { _id: _id },
          {
            $push: {
              mentorIds: { mentorId: mentorId },
            },
          },
          { new: true }
        );
        res.json({
          code: 200,
          message: "Apply thành công !",
          data: updateResult,
        });
      } else {
        res.json({
          code: 404,
          message: "Mentor not found!",
        });
      }
    } else {
      res.json({
        code: 400,
        message: "Apply thất bại !",
      });
    }
  } catch (error) {
    console.error("Error applying now:", error);
    res.status(500).json({
      code: 500,
      message: "An error occurred while applying.",
    });
  }
};
// [POST] /api/v1/users/rateMentor/:id
export const rateMentor = async (req, res) => {
  try {
    const idMentor = req.params.id;
    const tokenUser = req.body.token;
    const numberRate = req.body.rate;

    // Find the user by their token
    const user = await Users.findOne({ token: tokenUser });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already rated the mentor
    const existingRate = user.rateForMentors.find(
      (rate) => rate.idMentor === idMentor
    );

    if (existingRate) {
      // If the mentor has already been rated, update the rating
      existingRate.rateNumber = numberRate;
    } else {
      // If the mentor hasn't been rated, add a new rating
      user.rateForMentors.push({ idMentor, rateNumber: numberRate });
    }

    // Save the updated user document
    await user.save();

    // Now update the Mentor document
    const mentor = await Mentors.findById(idMentor);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Check if the user has already rated this mentor
    const existingMentorRate = mentor.rateOfMentees.find(
      (rate) => rate.idMentee === user._id.toString()
    );

    if (existingMentorRate) {
      // If the mentor has already been rated by this mentee, update the rating
      existingMentorRate.rateNumber = numberRate;
    } else {
      // Add new rating to mentor's rateOfMentees array
      mentor.rateOfMentees.push({
        idMentee: user._id.toString(),
        rateNumber: numberRate,
      });
    }

    // Recalculate the mentor's average rating
    const totalRates = mentor.rateOfMentees.reduce(
      (sum, rate) => sum + rate.rateNumber,
      0
    );
    mentor.numberRate = mentor.rateOfMentees.length;
    mentor.rate = totalRates / mentor.numberRate;

    // Save the updated mentor document
    await mentor.save();

    return res.status(200).json({ message: "Mentor rated successfully" });
  } catch (error) {
    console.error("Error rating mentor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
