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
exports.getSettings = exports.editUserBanner = exports.editHomeBanner = exports.editAvatarDefault = exports.deleteStudy = exports.deleteEnterprise = exports.deleteDomain = exports.deleteSpecialization = exports.editStudy = exports.editSpecialization = exports.editEnterprise = exports.editDomain = exports.createCategory = exports.listCategory = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../../helpers/generate.helper");
const admin_model_1 = __importDefault(require("../models/admin.model"));
const enterprise_model_1 = __importDefault(require("../models/enterprise.model"));
const study_model_1 = __importDefault(require("../models/study.model"));
const domain_model_1 = __importDefault(require("../models/domain.model"));
const specialization_model_1 = __importDefault(require("../models/specialization.model"));
const settingGeneral_model_1 = __importDefault(require("../models/settingGeneral.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield admin_model_1.default.findOne({
            email: req.body.email,
            deleted: false,
        });
        if (emailExist) {
            res.json({
                code: 400,
                message: "Email đã tồn tại !",
            });
        }
        else {
            req.body.password = (0, md5_1.default)(req.body.password);
            req.body.token = (0, generate_helper_1.generateRandomString)(30);
            const user = new admin_model_1.default(req.body);
            const data = yield user.save();
            const token = data.token;
            res.json({
                code: 200,
                message: "Tạo tài khoản thành công !",
                token: token,
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Tạo tài khoản thất bại !",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield admin_model_1.default.findOne({
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
            admin: user,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Đăng nhập thất bại!",
        });
    }
});
exports.login = login;
const listCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAllEnterprise = yield enterprise_model_1.default.find();
        const listAllStudy = yield study_model_1.default.find();
        const listAllDomain = yield domain_model_1.default.find();
        const listAllSpecialization = yield specialization_model_1.default.find();
        res.json({
            code: 200,
            enterprises: listAllEnterprise,
            studies: listAllStudy,
            domains: listAllDomain,
            specialization: listAllSpecialization,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Đã xảy ra lỗi !",
        });
    }
});
exports.listCategory = listCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEnterprise = req.body.enterprise;
        const newStudy = req.body.study;
        const newDomain = req.body.domain;
        const newSpecialization = req.body.specialization;
        if (newEnterprise) {
            const enterprise = new enterprise_model_1.default({
                description: newEnterprise,
            });
            const data = yield enterprise.save();
            res.json({
                code: 200,
                message: "Tạo thành công",
                data,
            });
            return;
        }
        if (newStudy) {
            const study = new study_model_1.default({
                description: newStudy,
            });
            const data = yield study.save();
            res.json({
                code: 200,
                message: "Tạo thành công",
                data,
            });
            return;
        }
        if (newDomain) {
            const domain = new domain_model_1.default({
                description: newDomain,
            });
            const data = yield domain.save();
            res.json({
                code: 200,
                message: "Tạo thành công",
                data,
            });
            return;
        }
        if (newSpecialization) {
            const specialization = new specialization_model_1.default({
                description: newSpecialization,
            });
            const data = yield specialization.save();
            res.json({
                code: 200,
                message: "Tạo thành công",
                data,
            });
            return;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Đã xảy ra lỗi !",
        });
    }
});
exports.createCategory = createCategory;
const editDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idDomain = req.params.id;
    const newDomain = req.body.domain;
    try {
        const result = yield domain_model_1.default.updateOne({ _id: idDomain }, { description: newDomain });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Domain updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Domain not found or no changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editDomain = editDomain;
const editEnterprise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEnterprise = req.params.id;
    const newEnterprise = req.body.enterprise;
    try {
        const result = yield enterprise_model_1.default.updateOne({ _id: idEnterprise }, { description: newEnterprise });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Enterprise updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Enterprise not found or no changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editEnterprise = editEnterprise;
const editSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSpecialization = req.params.id;
    const newSpecialization = req.body.specialization;
    try {
        const result = yield specialization_model_1.default.updateOne({ _id: idSpecialization }, { description: newSpecialization });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Specialization updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Specialization not found or no changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editSpecialization = editSpecialization;
const editStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idStudy = req.params.id;
    const newStudy = req.body.study;
    try {
        const result = yield study_model_1.default.updateOne({ _id: idStudy }, { description: newStudy });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Study updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Study not found or no changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editStudy = editStudy;
const deleteSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSpecialization = req.params.id;
    try {
        const result = yield specialization_model_1.default.deleteOne({ _id: idSpecialization });
        if (result.deletedCount > 0) {
            res.json({
                code: 200,
                message: "Specialization deleted successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Specialization not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.deleteSpecialization = deleteSpecialization;
const deleteDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idDomain = req.params.id;
    try {
        const result = yield domain_model_1.default.deleteOne({ _id: idDomain });
        if (result.deletedCount > 0) {
            res.json({
                code: 200,
                message: "Domain deleted successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Domain not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.deleteDomain = deleteDomain;
const deleteEnterprise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEnterprise = req.params.id;
    try {
        const result = yield enterprise_model_1.default.deleteOne({ _id: idEnterprise });
        if (result.deletedCount > 0) {
            res.json({
                code: 200,
                message: "Enterprise deleted successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Enterprise not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.deleteEnterprise = deleteEnterprise;
const deleteStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idStudy = req.params.id;
    try {
        const result = yield study_model_1.default.deleteOne({ _id: idStudy });
        if (result.deletedCount > 0) {
            res.json({
                code: 200,
                message: "Study deleted successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "Study not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.deleteStudy = deleteStudy;
const editAvatarDefault = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAvatarDefault = req.body.file;
        const result = yield settingGeneral_model_1.default.updateOne({}, { $set: { avatarDefault: newAvatarDefault } });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Avatar default updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "No changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editAvatarDefault = editAvatarDefault;
const editHomeBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHomeBanner = req.body.file;
        const result = yield settingGeneral_model_1.default.updateOne({}, { $set: { homeBanner: newHomeBanner } });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Avatar default updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "No changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editHomeBanner = editHomeBanner;
const editUserBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserBanner = req.body.file;
        const result = yield settingGeneral_model_1.default.updateOne({}, { $set: { userBanner: newUserBanner } });
        if (result.modifiedCount > 0) {
            res.json({
                code: 200,
                message: "Avatar default updated successfully",
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "No changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.editUserBanner = editUserBanner;
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield settingGeneral_model_1.default.find();
        if (data) {
            res.json({
                code: 200,
                data: data,
            });
        }
        else {
            res.status(404).json({
                code: 404,
                message: "No changes made",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.getSettings = getSettings;
