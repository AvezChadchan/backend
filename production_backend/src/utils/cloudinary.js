import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //file system used to read,write,change permission,append,etc thefile

//unlink = delete

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("successfully uploaded the file", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //it removes the locally saved temporary file as the upload operation got failed
    return null;
  }
};

// cloudinary.v2.uploader
//   .upload("sample.jpg", { width: 2000, height: 1000, crop: "limit" })
//   .then((result) => console.log(result));

export { uploadOnCloudinary };
