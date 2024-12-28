import multer from "multer";

const MIMETYPE = ["image/png", "image/jpg", "image/jpeg"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    const id = req.auth.id;
    const uniqueSuffix = id + Date.now();
    const extension = file.originalname.split(".").pop();
    const filename = file.fieldname + "-" + uniqueSuffix + "." + extension;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (MIMETYPE.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({ storage, fileFilter });
