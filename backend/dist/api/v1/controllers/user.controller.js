"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewMentor = exports.rateMentor = exports.applyNow = exports.deleteSaveMentor = exports.resetPasswordPost = exports.otpPasswordPost = exports.forgotPasswordPost = exports.updateUser = exports.detailPure = exports.detail = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_helper_1 = require("../../../helpers/generate.helper");
const forgot_password_model_1 = __importDefault(require("../models/forgot-password.model"));
const send_mail_helper_1 = require("../../../helpers/send-mail.helper");
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const user_model_2 = __importDefault(require("../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false,
        });
        if (emailExist) {
            res.json({
                code: 400,
                message: "Email đã tồn tại!",
            });
        }
        else {
            req.body.password = (0, md5_1.default)(req.body.password);
            req.body.token = (0, generate_helper_1.generateRandomString)(30);
            const user = new user_model_1.default(req.body);
            const data = yield user.save();
            const token = data.token;
            res.json({
                code: 200,
                message: "Tạo tài khoản thành công!",
                token: token,
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Tạo tài khoản không thành công!",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_model_1.default.findOne({
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
        if ((0, md5_1.default)(password) !== user.password) {
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
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Đăng nhập không thành công!",
        });
    }
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const infoUser = res.locals.user;
        const mentorIds = infoUser.mentorIds.map((mentor) => mentor.mentorId);
        const mentorDetails = yield Promise.all(mentorIds.map((mentorId) => mentor_model_1.default.findOne({ _id: mentorId }).select("-id")));
        const saveMentorIds = infoUser.saveMentorIds.map((mentor) => mentor.mentorId);
        const saveMentorDetails = yield Promise.all(saveMentorIds.map((mentorId) => mentor_model_1.default.findOne({ _id: mentorId }).select("-id")));
        res.json({
            code: 200,
            message: "Thành công!",
            info: res.locals.user,
            infoMentors: mentorDetails,
            saveInfoMentors: saveMentorDetails,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Không thành công",
        });
    }
});
exports.detail = detail;
const detailPure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: "Thành công!",
            info: res.locals.user,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Không thành công",
        });
    }
});
exports.detailPure = detailPure;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, school, studentId, email, number, avatar, mentorId, saveMentorId, } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    try {
        if (mentorId && saveMentorId) {
            var updatedUser = yield user_model_1.default.findOneAndUpdate({ token: token }, {
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
            }, { new: true });
            res.json({
                code: 200,
                message: "Cập nhật thông tin thành công!",
                user: updatedUser,
            });
            return;
        }
        else if (saveMentorId) {
            var updatedUser = yield user_model_1.default.findOneAndUpdate({ token: token }, {
                name,
                school,
                studentId,
                email,
                avatar,
                number,
                $push: {
                    saveMentorIds: { mentorId: saveMentorId },
                },
            }, { new: true });
        }
        else if (mentorId) {
            var updatedUser = yield user_model_1.default.findOneAndUpdate({ token: token }, {
                name,
                school,
                studentId,
                email,
                avatar,
                number,
                $push: {
                    mentorIds: { mentorId: mentorId },
                },
            }, { new: true });
        }
        else {
            var updatedUser = yield user_model_1.default.findOneAndUpdate({ token: token }, {
                name,
                school,
                studentId,
                avatar,
                email,
                number,
            }, { new: true });
        }
        res.json({
            code: 200,
            message: "Cập nhật thông tin thành công!",
            user: updatedUser,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Cập nhật thông tin không thành công!",
        });
    }
});
exports.updateUser = updateUser;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield user_model_1.default.findOne({
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
        const otp = (0, generate_helper_1.generateRandomNumber)(6);
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expiresAt: Date.now() + 1,
        };
        const record = new forgot_password_model_1.default(objectForgotPassword);
        yield record.save();
        const subject = `Mã OTP lấy lại lại mật khẩu`;
        const content = `Mã OTP của bạn là <b>${otp}</b>. Vui lòng không chia sẻ với bất cứ ai. Mã OTP sẽ hết hạn trong 1 phút, nếu quá một phút vui lòng điền lại email !`;
        (0, send_mail_helper_1.sendMail)(email, subject, content);
        res.json({
            code: 200,
            message: "Đã gửi OTP",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không gửi được OTP",
        });
    }
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const find = {
            email: email,
            otp: otp,
        };
        const result = yield forgot_password_model_1.default.findOne(find);
        if (!result) {
            res.json({
                code: 400,
                message: "OTP không hợp lệ!",
            });
            return;
        }
        const user = yield user_model_1.default.findOne({
            email: email,
        });
        res.json({
            code: 200,
            token: user.token,
        });
    }
    catch (error) {
        res.json({
            code: 400,
        });
    }
});
exports.otpPasswordPost = otpPasswordPost;
const resetPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const tokenUser = req.headers.authorization.split(" ")[1];
    try {
        yield user_model_1.default.updateOne({
            tokenUser: tokenUser,
        }, {
            password: (0, md5_1.default)(password),
        });
        res.json({
            code: 200,
            message: "Lấy lại mật khẩu thành công !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lấy lại mật khẩu không thành công !",
        });
        console.log(error);
    }
});
exports.resetPasswordPost = resetPasswordPost;
const deleteSaveMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idMentor = req.params.id;
    const tokenUser = req.headers.authorization.split(" ")[1];
    try {
        const result = yield user_model_1.default.updateOne({
            token: tokenUser,
        }, {
            $pull: { saveMentorIds: { mentorId: idMentor } },
        });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Đã xóa lưu mentor",
            });
        }
        else {
            res.json({
                code: 404,
                message: "Mentor không tồn tại hoặc đã được xóa",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Xóa lưu mentor không thành công!",
        });
        console.error(error);
    }
});
exports.deleteSaveMentor = deleteSaveMentor;
const applyNow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, email, field, fullName, introduction, issueDescription, domain, phone, school, studentID, cv, } = req.body;
        const newMentee = {
            userId: _id,
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
        const updateResult = yield mentor_model_1.default.updateOne({ _id: mentorId }, { $push: { mentees: newMentee } });
        if (updateResult.modifiedCount > 0) {
            const mentor = yield mentor_model_1.default.findOne({ _id: mentorId }).select("mentees");
            if (mentor) {
                const newMenteeCount = mentor.mentees.length;
                yield mentor_model_1.default.updateOne({ _id: mentorId }, { menteeCount: newMenteeCount });
                var updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: _id }, {
                    $push: {
                        mentorIds: { mentorId: mentorId },
                    },
                }, { new: true });
                res.json({
                    code: 200,
                    message: "Apply thành công !",
                    data: updateResult,
                });
            }
            else {
                res.json({
                    code: 404,
                    message: "Mentor not found!",
                });
            }
        }
        else {
            res.json({
                code: 400,
                message: "Apply thất bại !",
            });
        }
    }
    catch (error) {
        console.error("Error applying now:", error);
        res.status(500).json({
            code: 500,
            message: "An error occurred while applying.",
        });
    }
});
exports.applyNow = applyNow;
const rateMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idMentor = req.params.id;
        const tokenUser = res.locals.token;
        const numberRate = req.body.rate;
        const user = yield user_model_2.default.findOne({ token: tokenUser });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const existingRate = user.rateForMentors.find((rate) => rate.idMentor === idMentor);
        if (existingRate) {
            existingRate.rateNumber = numberRate;
        }
        else {
            user.rateForMentors.push({ idMentor, rateNumber: numberRate });
        }
        yield user.save();
        const mentor = yield mentor_model_1.default.findById(idMentor);
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        const existingMentorRate = mentor.rateOfMentees.find((rate) => rate.idMentee === user._id.toString());
        if (existingMentorRate) {
            existingMentorRate.rateNumber = numberRate;
        }
        else {
            mentor.rateOfMentees.push({
                idMentee: user._id.toString(),
                rateNumber: numberRate,
            });
        }
        const totalRates = mentor.rateOfMentees.reduce((sum, rate) => sum + rate.rateNumber, 0);
        mentor.numberRate = mentor.rateOfMentees.length;
        mentor.rate = totalRates / mentor.numberRate;
        yield mentor.save();
        return res.status(200).json({ message: "Mentor rated successfully" });
    }
    catch (error) {
        console.error("Error rating mentor:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.rateMentor = rateMentor;
const reviewMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idMentor = req.params.id;
        const tokenUser = res.locals.token;
        const reviewMessage = req.body.review;
        const user = yield user_model_2.default.findOne({ token: tokenUser });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const mentor = yield mentor_model_1.default.findById(idMentor);
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        const newReview = {
            userId: user._id,
            message: reviewMessage,
            createAt: new Date(),
        };
        mentor.review.push(newReview);
        yield mentor.save();
        const userReview = {
            message: reviewMessage,
            mentorId: mentor._id,
        };
        user.myReviews.push(userReview);
        yield user.save();
        return res
            .status(200)
            .json({ message: "Review added successfully", mentor, user });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
});
exports.reviewMentor = reviewMentor;
