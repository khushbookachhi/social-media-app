import multer from "multer";
import path from 'path';


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null, "./uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g, '_')+file.originalname);
    },
});
// only accept image and video files
const fileFilter = (req, file, cb) => {
    // Accept images and videos only
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new Error('Only images and video files are allowed!'));
    }
};

const upload=multer({
    storage:storage,
    fileFilter: fileFilter
});
export {upload};