const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Create folder if not exists
const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

// Dynamic storage
const storage = (folderName) =>
    multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join("uploads", folderName);
            createFolder(uploadPath);
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const id = req.body._id || Date.now();
            cb(null, `${id}${ext}`);
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