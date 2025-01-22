const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Updated file filter to accept both images and videos
const fileFilter = (req, file, cb) => {
  console.log("req.files:", file);
  // Add supported image and video MIME types
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
    "image/avif",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/webm",
  ];

  // Check if the file type is allowed
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    switch (file.fieldname) {
      case "image":
        uploadPath = path.join(__dirname, "../public/img/uploads/trendy");
        break;
      case "blogimage":
        uploadPath = path.join(__dirname, "../public/img/uploads/blog");
        break;
      case "ringimage":
        uploadPath = path.join(__dirname, "../public/img/uploads/ring");
        break;
      case "braceletimage":
        uploadPath = path.join(__dirname, "../public/img/uploads/bracelet");
        break;
      case "pendantimage":
        uploadPath = path.join(__dirname, "../public/img/uploads/pendant");
        break;
      case "necklaceimage":
        uploadPath = path.join(__dirname, "../public/img/uploads/necklace");
        break;
      case "earringimage":
        uploadPath = path.join(__dirname, "../public/img/uploads/earring");
        break;
      default:
        return cb(new Error("Unexpected field for path which does not exist"), null);
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
