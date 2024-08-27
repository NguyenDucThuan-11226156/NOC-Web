import { Request, Response } from "express";
import md5 from "md5";
import { generateRandomString } from "../../../helpers/generate.helper";
import Admin from "../models/admin.model";
import Enterprise from "../models/enterprise.model";
import Study from "../models/study.model";
import Domain from "../models/domain.model";
import Specialization from "../models/specialization.model";
import SettingGeneral from "../models/settingGeneral.model";
// [POST] /api/v1/admin/register
export const register = async (req: Request, res: Response) => {
  try {
    const emailExist = await Admin.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      res.json({
        code: 400,
        message: "Email đã tồn tại !",
      });
    } else {
      req.body.password = md5(req.body.password);
      req.body.token = generateRandomString(30);
      const user = new Admin(req.body);
      const data = await user.save();
      const token = data.token;
      res.json({
        code: 200,
        message: "Tạo tài khoản thành công !",
        token: token,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo tài khoản thất bại !",
    });
  }
};
// [POST] /api/v1/admin/login
export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await Admin.findOne({
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
      admin: user,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập thất bại!",
    });
  }
};
// [GET] /api/v1/admin/listCategory
export const listCategory = async (req: Request, res: Response) => {
  try {
    const listAllEnterprise = await Enterprise.find();
    const listAllStudy = await Study.find();
    const listAllDomain = await Domain.find();
    const listAllSpecialization = await Specialization.find();
    res.json({
      code: 200,
      enterprises: listAllEnterprise,
      studies: listAllStudy,
      domains: listAllDomain,
      specialization: listAllSpecialization,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đã xảy ra lỗi !",
    });
  }
};
// [POST] /api/v1/admin/createCategory
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newEnterprise = req.body.enterprise;
    const newStudy = req.body.study;
    const newDomain = req.body.domain;
    const newSpecialization = req.body.specialization;
    if (newEnterprise) {
      const enterprise = new Enterprise({
        description: newEnterprise,
      });
      const data = await enterprise.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
    if (newStudy) {
      const study = new Study({
        description: newStudy,
      });
      const data = await study.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
    if (newDomain) {
      const domain = new Domain({
        description: newDomain,
      });
      const data = await domain.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
    if (newSpecialization) {
      const specialization = new Specialization({
        description: newSpecialization,
      });
      const data = await specialization.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data,
      });
      return;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Đã xảy ra lỗi !",
    });
  }
};
// [POST] /api/v1/admin/editDomain/:id
export const editDomain = async (req: Request, res: Response) => {
  const idDomain = req.params.id;
  const newDomain = req.body.domain;
  try {
    // Await the database update operation
    const result = await Domain.updateOne(
      { _id: idDomain },
      { description: newDomain }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Domain updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Domain not found or no changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [POST] /api/v1/admin/editEnterprise/:id
export const editEnterprise = async (req: Request, res: Response) => {
  const idEnterprise = req.params.id;
  const newEnterprise = req.body.enterprise;

  try {
    // Await the database update operation
    const result = await Enterprise.updateOne(
      { _id: idEnterprise },
      { description: newEnterprise }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Enterprise updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Enterprise not found or no changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [POST] /api/v1/admin/editSpecialization/:id
export const editSpecialization = async (req: Request, res: Response) => {
  const idSpecialization = req.params.id;
  const newSpecialization = req.body.specialization;

  try {
    // Await the database update operation
    const result = await Specialization.updateOne(
      { _id: idSpecialization },
      { description: newSpecialization }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Specialization updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Specialization not found or no changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [POST] /api/v1/admin/editStudy/:id
export const editStudy = async (req: Request, res: Response) => {
  const idStudy = req.params.id;
  const newStudy = req.body.study;

  try {
    // Await the database update operation
    const result = await Study.updateOne(
      { _id: idStudy },
      { description: newStudy }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Study updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Study not found or no changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [DELETE] /api/v1/admin/deleteSpecialization/:id
export const deleteSpecialization = async (req: Request, res: Response) => {
  const idSpecialization = req.params.id;

  try {
    // Await the database delete operation
    const result = await Specialization.deleteOne({ _id: idSpecialization });

    // Check if the deletion was successful
    if (result.deletedCount > 0) {
      res.json({
        code: 200,
        message: "Specialization deleted successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Specialization not found",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [DELETE] /api/v1/admin/deleteDomain/:id
export const deleteDomain = async (req: Request, res: Response) => {
  const idDomain = req.params.id;

  try {
    // Await the database delete operation
    const result = await Domain.deleteOne({ _id: idDomain });

    // Check if the deletion was successful
    if (result.deletedCount > 0) {
      res.json({
        code: 200,
        message: "Domain deleted successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Domain not found",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [DELETE] /api/v1/admin/deleteEnterprise/:id
export const deleteEnterprise = async (req: Request, res: Response) => {
  const idEnterprise = req.params.id;

  try {
    // Await the database delete operation
    const result = await Enterprise.deleteOne({ _id: idEnterprise });

    // Check if the deletion was successful
    if (result.deletedCount > 0) {
      res.json({
        code: 200,
        message: "Enterprise deleted successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Enterprise not found",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [DELETE] /api/v1/admin/deleteStudy/:id
export const deleteStudy = async (req: Request, res: Response) => {
  const idStudy = req.params.id;
  try {
    // Await the database delete operation
    const result = await Study.deleteOne({ _id: idStudy });

    // Check if the deletion was successful
    if (result.deletedCount > 0) {
      res.json({
        code: 200,
        message: "Study deleted successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Study not found",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [POST] /api/v1/admin/editAvatarDefault
export const editAvatarDefault = async (req: Request, res: Response) => {
  try {
    const newAvatarDefault = req.body.file;
    // Update the avatarDefault field in the SettingGeneral collection
    const result = await SettingGeneral.updateOne(
      {},
      { $set: { avatarDefault: newAvatarDefault } }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Avatar default updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "No changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [POST] /api/v1/admin/editHomeBanner
export const editHomeBanner = async (req: Request, res: Response) => {
  try {
    const newHomeBanner = req.body.file;

    // Update the HomeBanner field in the SettingGeneral collection
    const result = await SettingGeneral.updateOne(
      {},
      { $set: { homeBanner: newHomeBanner } }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Avatar default updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "No changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [POST] /api/v1/admin/editUserBanner
export const editUserBanner = async (req: Request, res: Response) => {
  try {
    const newUserBanner = req.body.file;

    // Update the UserBanner field in the SettingGeneral collection
    const result = await SettingGeneral.updateOne(
      {},
      { $set: { userBanner: newUserBanner } }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        message: "Avatar default updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "No changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// [GET] /api/v1/admin/getSettings
export const getSettings = async (req: Request, res: Response) => {
  try {
    // Update the UserBanner field in the SettingGeneral collection
    const data = await SettingGeneral.find();
    // Check if the update was successful
    if (data) {
      res.json({
        code: 200,
        data: data,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "No changes made",
      });
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
