const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "medical-reports",
    resource_type: "raw",
    public_id: `${Date.now()}-${file.originalname.replace(".pdf", "")}`,
    format: "pdf",
  }),
});

const upload = multer({ storage });

module.exports = upload;