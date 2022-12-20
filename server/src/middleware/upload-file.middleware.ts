import multer from 'multer';

export const upload = multer({
  fileFilter: function (req, file, callback) {
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      return callback(new Error('Invalid file format'));
    }
    callback(null, true);
  },
});
