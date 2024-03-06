const multer = require("multer");

module.exports = () => {
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,`./public/admin/upload/${file.fieldname}`)
        } , 
        filename: (req,file,cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1E9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    
    })
    return storage;
}
