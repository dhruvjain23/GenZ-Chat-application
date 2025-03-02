import {v2 as cloudinary} from 'cloudinary'
import {config} from 'dotenv'

config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLLOUDINARY_API,
    api_secret:process.env.CLLOUDINARY_API_SECRET,
});

export default cloudinary;
