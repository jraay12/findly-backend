import multer from "multer";

export const multerUpload = multer({
  storage: multer.memoryStorage(), // store buffer in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});
