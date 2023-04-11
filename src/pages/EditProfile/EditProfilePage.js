import { useState, useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch';
import CropperPopup from '../../components/CropperPopup';
import HeaderMain from '../../components/HeaderMain';
import EditProfileForm from './components/EditProfileForm';
import { EditProfileContext } from '../../context/EditProfileContext';


const EditProfilePage = () => {
   const {data: owner, setData: setOwner} = useFetch("/users/me");   
   
   // Inputs
   const [avatar, setAvatar] = useState(null);
   
   
   // Cropper Related States
   const [newAvatar, setNewAvatar] = useState();
   const [selectedAvatar, setSelectedAvatar] = useState();
   const [croppedImage, setCroppedImage] = useState();
   const [isCropperBtnLoading, setIsCropperBtnLoading] = useState(false);


   // Then avatar state to croppedImage file
   // For the faithful time of submission
   useEffect(() => {
      if (croppedImage) {
         const croppedImageFile = new File([croppedImage], 'croppedImage');
         setIsCropperBtnLoading(false);
         setAvatar(croppedImage);
         setNewAvatarToImageReaderFormat({0: croppedImage}, true);
      }
   }, [croppedImage])


   // Handle Image Upload to Cropper Component
   // To crop image before upload
   function setNewAvatarToImageReaderFormat (data, updateAvatar) {
      const reader = new FileReader();
      const result = reader.addEventListener('load', () => {
         // To be sent to CropperPopup.js component for cropping
         setSelectedAvatar(reader.result);
         // To be shown in edit-profile avatar spot after being cropped
         if (updateAvatar === true) {
            setNewAvatar(reader.result);
         }
      })
      reader.readAsDataURL(data[0]);
      return result;
   }
   
   
   return (
      <EditProfileContext.Provider value={{owner, setOwner, avatar, setAvatar, newAvatar, setNewAvatar, selectedAvatar, setSelectedAvatar, croppedImage, setCroppedImage, isCropperBtnLoading, setIsCropperBtnLoading, setNewAvatarToImageReaderFormat}} >
         <div className='edit-profile-react'>

            {/* <HeaderSub owner={owner} setOwner={setOwner} /> */}
            <HeaderMain owner={owner ? owner : null} showRight={owner ? true : false} setOwner={setOwner}/>


            {selectedAvatar && <CropperPopup yourImg={selectedAvatar} setImage={setSelectedAvatar} setCroppedImage={setCroppedImage} isLoading={isCropperBtnLoading} setIsLoading={setIsCropperBtnLoading} />}


            {/* POP UP */}
            <div className="pop-up-container"></div>
            
            <main className="ep-container">
            
               <div className="rl-wrapper">
                  <div className="rl-container max-w-1000">
                     <EditProfileForm />
                  </div>
               </div>

            </main>

         </div>
      </EditProfileContext.Provider>
   )
}

export default EditProfilePage;