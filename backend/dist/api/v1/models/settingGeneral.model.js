"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settingGeneralSchema = new mongoose_1.default.Schema({
    avatarDefault: String,
    homeBanner: String,
    userBanner: String,
}, {
    timestamps: true,
});
const SettingGeneral = mongoose_1.default.model("settingGeneral", settingGeneralSchema, "settingGeneral");
exports.default = SettingGeneral;
