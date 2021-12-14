const multer = require('multer');

// write in available storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Upload file handler
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 30, // set the limit of file size now is 30mb
  },
});

// Available methods
module.exports = { upload };
