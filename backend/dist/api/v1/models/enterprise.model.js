"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enterpriseSchema = new mongoose_1.default.Schema({
    description: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Enterprise = mongoose_1.default.model("Enterprise", enterpriseSchema, "enterprise");
exports.default = Enterprise;
