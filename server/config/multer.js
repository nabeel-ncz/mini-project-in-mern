const multer = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "../server/public/uploads");
    },
    filename: (request, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage });
module.exports = upload;