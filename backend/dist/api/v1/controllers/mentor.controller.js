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
exports.detailMentor = exports.updateMentor = exports.deleteMentor = exports.createMentor = exports.filterMentors = exports.listMentors = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../../helpers/generate.helper");
const domain_model_1 = __importDefault(require("../models/domain.model"));
const enterprise_model_1 = __importDefault(require("../models/enterprise.model"));
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const specialization_model_1 = __importDefault(require("../models/specialization.model"));
const study_model_1 = __importDefault(require("../models/study.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
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
            message: "Tạo tài thất bại!",
        });
    }
});
exports.register = register;
const listMentors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limitNumber = req.body.limit;
        const skipNumber = (req.body.page - 1) * limitNumber;
        const listMentor = yield mentor_model_1.default.find().limit(limitNumber).skip(skipNumber);
        const listAllMentors = yield mentor_model_1.default.find();
        const listAllEnterprise = yield enterprise_model_1.default.find();
        const listAllStudy = yield study_model_1.default.find();
        const listAllDomain = yield domain_model_1.default.find();
        const listAllSpecialization = yield specialization_model_1.default.find();
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
    }
    catch (error) {
        res.json({
            code: 400,
            message: error,
        });
    }
});
exports.listMentors = listMentors;
const filterMentors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.keyword || null;
        const enterprise = req.body.organization || null;
        const specialization = req.body.specialization || null;
        const study = req.body.education || null;
        const domain = req.body.industry || null;
        const find = {};
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
        const listMentor = yield mentor_model_1.default.find(find)
            .limit(limitNumber)
            .skip(skipNumber);
        const listAllMentors = yield mentor_model_1.default.find(find);
        const total = listAllMentors.length;
        res.json({
            code: 200,
            mentors: listMentor,
            total: total,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error,
        });
    }
});
exports.filterMentors = filterMentors;
const createMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mentor = new mentor_model_1.default({
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
        const data = yield mentor.save();
        res.json({
            code: 200,
            data: data,
            message: "Tạo mentor thành công !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error,
        });
    }
});
exports.createMentor = createMentor;
const deleteMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idMentor = req.params.id;
        yield mentor_model_1.default.deleteOne({
            _id: idMentor,
        });
        yield user_model_1.default.updateMany({}, {
            $pull: { saveMentorIds: idMentor },
        });
        res.json({
            code: 200,
            message: "Xóa mentor thành công !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error,
        });
    }
});
exports.deleteMentor = deleteMentor;
const updateMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idMentor = req.params.id;
        yield mentor_model_1.default.updateOne({
            _id: idMentor,
        }, {
            name: req.body.name,
            avatar: req.body.avatar,
            introduction1: req.body.introduction1,
            introduction2: req.body.introduction2,
            organization: req.body.organization,
            specialization: req.body.specialization,
            education: req.body.education,
            industry: req.body.industry,
        });
        res.json({
            code: 200,
            message: "Cập nhật mentor thành công !",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error,
        });
    }
});
exports.updateMentor = updateMentor;
const detailMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idMentor = req.params.id;
        const infoMentor = yield mentor_model_1.default.find({
            _id: idMentor,
        });
        res.json({
            mentor: infoMentor,
            code: 200,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: error,
        });
    }
});
exports.detailMentor = detailMentor;
