const multer = require('multer');
const path = require('path');
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../asset/uploads/');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    try {
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        return cb(new Error(textMessage.multer.fileTypeError));
      } else {
        var fileName = Date.now() + '-user';
        file.filename = fileName;
        cb(null, fileName + '.jpg');
      }
    } catch (error) {
      console.log({ "ERROR": error.message });
    }
  }
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 } //file 2 MB
});

module.exports = upload;