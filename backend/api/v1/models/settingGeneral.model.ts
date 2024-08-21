import mongoose from "mongoose";

const settingGeneralSchema = new mongoose.Schema(
  {
    avatarDefault: String,
    homeBanner: String,
    userBanner: String,
  },
  {
    timestamps: true,
  }
);

const SettingGeneral = mongoose.model(
  "settingGeneral",
  settingGeneralSchema,
  "settingGeneral"
);

export default SettingGeneral;
