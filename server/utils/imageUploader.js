

const cloudinary= require('cloudinary').v2;

exports.uploadImageToCloudinary= async( file,folder,height,quality)=>{
    try{
            const options={folder};
            if(height) options.height=height;
            if(quality) options.quality;
            options.resoure_type='auto';
            const details= cloudinary.uploader.upload(file.tempFilePath,options);
            console.log(details);
            return details;
    }
    catch(err){
        console.log("err in image uploader->",err);
    }
}