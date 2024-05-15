import multer, { Multer } from 'multer';


const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload: Multer = multer({ storage: storage });

export default upload