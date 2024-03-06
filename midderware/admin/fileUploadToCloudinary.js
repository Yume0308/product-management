const cloudinary =require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true 
});

module.exports.cloudinaryUpload = async(req,res,next) => {
  const uploadResult = await new Promise((resolve,reject)=> {
    cloudinary.uploader.upload_stream((error,uploadResult)=> {
      return resolve(uploadResult);
    })
    streamifier.createReadStream(req.files.buffer).pipe(uploadResult);
  })

  async 
}
