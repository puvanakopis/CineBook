const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = (folderName) =>
    new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `CineBook/${folderName}`,
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: (req, file) => {
                const id = (req.user && req.user.id) || req.body._id || Date.now();
                return `${id}`;
            },
        },
    });

const uploadImage = (folderName) =>
    multer({
        storage: storage(folderName),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith("image/")) {
                cb(null, true);
            } else {
                cb(new Error("Only images allowed"), false);
            }
        },
    });

module.exports = { uploadImage };