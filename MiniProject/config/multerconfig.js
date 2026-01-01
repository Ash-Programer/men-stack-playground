const multer = require('multer');
const path  = require('path');
const crypto = require('crypto');

// we need to make disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    // making random name
    crypto.randomBytes(12,(err, name)=>{
        const fileName = name.toString('hex') + path.extname(file.originalname)
        cb(null, fileName)
    })
  }
})

const upload = multer({ storage: storage })
// then we can export upload

module.exports = upload;