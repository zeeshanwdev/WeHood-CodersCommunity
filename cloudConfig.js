import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';


// Configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
});

    
// Cloudinary Upload Function                                                                      
const uploadToCloudinary = (buffer, folder = 'wehood_assets', allowedFormats = ['png', 'jpg', 'jpeg']) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, allowed_formats: allowedFormats },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        // Convert the buffer into a readable stream and pipe to Cloudinary
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

export {
    cloudinary,
    uploadToCloudinary
}
