const { cloudimage } = require("../config/cloudinary");
const { generateUUID } = require("../utils/functions");

exports.uploadAvatar = async (avatar) => {
  const avatarUUID = generateUUID();
  try {
    const uploadedAvatar = await cloudimage.v2.uploader.upload(avatar, {
      public_id: "bo_ua_" + avatarUUID,
    });
    return uploadedAvatar.secure_url;
  } catch {
    throw 400;
  }
};

exports.uploadIncidentPhoto = async (photo) => {
  const photoUUID = generateUUID();
  try {
    const uploadedPhoto = await cloudimage.v2.uploader.upload(photo, {
      overwrite: true,
      invalidate: true,
      width: 810,
      height: 456,
      crop: "fill",
      public_id: "inc-ph-" + photoUUID,
    });
    return uploadedPhoto.secure_url;
  } catch {
    throw 400;
  }
};
