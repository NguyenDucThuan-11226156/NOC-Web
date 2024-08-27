"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    school: String,
    domain: String,
    token: String,
    studentId: String,
    saving: String,
    number: Number,
    avatar: String,
    rateForMentors: [
        {
            idMentor: String,
            rateNumber: Number,
        },
    ],
    mentorIds: [
        {
            mentorId: String,
        },
    ],
    saveMentorIds: [
        {
            mentorId: String,
        },
    ],
    myReviews: [
        {
            message: String,
            mentorId: String,
        },
    ],
    description: String,
    categoriesConsultId: String,
    description_proplem: String,
    linkCv: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Users = mongoose_1.default.model("Users", userSchema, "users");
exports.default = Users;
