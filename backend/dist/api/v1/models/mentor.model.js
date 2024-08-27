"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mentorSchema = new mongoose_1.default.Schema({
    name: String,
    avatar: String,
    menteeCount: Number,
    introduction1: String,
    introduction2: String,
    rate: Number,
    rateOfMentees: [
        {
            idMentee: String,
            rateNumber: Number,
        },
    ],
    numberRate: Number,
    keyword: String,
    organization: String,
    specialization: String,
    education: String,
    industry: String,
    other: String,
    companyLogo: String,
    field: String,
    experience: String,
    mentees: [
        {
            userId: String,
            name: String,
            school: String,
            domain: String,
            studentId: String,
            number: Number,
            email: String,
            introduction: String,
            field: String,
            issueDescription: String,
            cv: {
                url: String,
                originalFilename: String,
            },
        },
    ],
    review: [
        {
            userId: String,
            message: String,
            createAt: Date,
        },
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Mentors = mongoose_1.default.model("Mentors", mentorSchema, "mentors");
exports.default = Mentors;
