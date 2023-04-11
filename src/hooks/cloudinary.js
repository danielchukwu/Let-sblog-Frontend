import {useState} from 'react'
import axios from 'axios';

export const cloudinaryService = async (image) => {
   if (image === null){
      return null;
   }
   // Create form with image file to be uploaded to cloudinary
   const formData = new FormData();
   formData.append("file", image);
   formData.append("upload_preset", 'zsjlducw');

   // Post image to cloudinary
   const result = await axios.post("https://api.cloudinary.com/v1_1/dhtcwqsx4/image/upload", formData)
   .then((res) => {
      console.log(res)
      return res.data.public_id
   })
   .catch((err) => null);
   
   return result;
}
