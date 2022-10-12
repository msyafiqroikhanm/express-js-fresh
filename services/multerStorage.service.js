const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync('public')) {
      cb(null, 'public')
    } else {
      fs.mkdirSync('public')
      cb(null, 'public')
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

module.exports = storage