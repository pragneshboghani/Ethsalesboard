import multer from "multer";
import path from "path";
import fs from "fs";

// Get the project root directory
const projectRoot = process.cwd();

// Define namespace for uploads
const uploadNamespace = "uploads";

// Ensure the uploads directory exists at the project root
const uploadDir = path.join(projectRoot, uploadNamespace);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const sanitizeFilename = (filename) => {
      return filename.replace(/\s+/g, "_").replace(/[^\w.-]+/g, "");
    };
    const ext = path.extname(file.originalname); // Get file extension
    const baseName = path.basename(sanitizeFilename(file.originalname), ext);
    const uniqueName = `${baseName}-${Date.now()}.${
      file.mimetype.split("/")[1]
    }`;
    // Store only namespace path in req.filepath
    req.filepath = path.join(uploadNamespace, uniqueName);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // Limit to 1GB per file
    files: 2000, // Allow up to 200 files
  },
});

// Error handling middleware
const uploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({
        status: false,
        message: "File size is too large.",
        error: "File is too large",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).send({
        status: false,
        message: "Maximum upload limit reached.",
        error: "Maximum file upload limit",
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        status: false,
        message: "Unexpected file type.",
        error: "File type not supported",
      });
    }
  } else {
    next(error);
  }
};

export { upload, uploadError };