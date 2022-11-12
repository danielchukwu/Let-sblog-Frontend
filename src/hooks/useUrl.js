import React from 'react'

export const useUrl = () => {
   const host_url = 'http://127.0.0.1:5000/api';
   const cloudinary_image_url = 'http://res.cloudinary.com/dhtcwqsx4/image/upload/v1668247079';
   
   return {cloudinary_image_url, host_url};
}
