import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderSub } from '../components/HeaderSub';
import { useCloudinary } from '../hooks/useCloudinary';
import { useConstants } from '../hooks/useConstants';
import useFetch from '../hooks/useFetch';
import { useUrl } from '../hooks/useUrl';
import displayPopup from '../utils/displayPopup';
import { ClipLoader } from 'react-spinners';
import CropperPopup from '../components/CropperPopup';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css'


const EditProfile = () => {
   const {data: owner, setData: setOwner} = useFetch("/users/me");
   const navigate = useNavigate();
   const {cloudinary_image_url} = useUrl();
   const {spinnerStyle} = useConstants();
   const [isLoading, setIsLoading] = useState(false);
   
   
   // Inputs
   const [name, setName] = useState();
   const [username, setUsername] = useState();
   const [email, setEmail] = useState();
   const [location, setLocation] = useState();
   const [instagram, setInstagram] = useState();
   const [website, setWebsite] = useState();
   const [linkedin, setLinkedin] = useState();
   const [facebook, setFacebook] = useState();
   const [youtube, setYoutube] = useState();
   const [twitter, setTwitter] = useState();
   const [bio, setBio] = useState();
   const [avatar, setAvatar] = useState(null);
   
   
   // Cropper Related States
   const [newAvatar, setNewAvatar] = useState();
   const [selectedAvatar, setSelectedAvatar] = useState();
   const inputImageRef = useRef();
   const [croppedImage, setCroppedImage] = useState();
   const [isCropperBtnLoading, setIsCropperBtnLoading] = useState(false);
   

   // Insert Default Profile Information
   useEffect(() => {
      console.log(owner)
      if (owner){
         setName(owner.name)
         setUsername(owner.username)
         setEmail(owner.email)
         setLocation(owner.location)
         setInstagram(owner.instagram)
         setWebsite(owner.website)
         setLinkedin(owner.linkedin)
         setFacebook(owner.facebook)
         setYoutube(owner.youtube)
         setTwitter(owner.twitter)
         setBio(owner.bio)
      }
   }, [owner])
   
   
   // Handle Form Submission
   const HandleSubmit = async (e) => {
      e.preventDefault();
      // Upload Image if any
      let imageId = await useCloudinary(avatar);
      // Body for updated fields only
      const body = {};
      
      // keys, original input values, current input values
      const fieldKeys = ['name', 'username', 'email', 'location', 'instagram', 'website', 'linkedin', 'facebook', 'youtube', 'twitter', 'bio'];
      const originalFieldValues = [owner.name, owner.username, owner.email, owner.location, owner.instagram, owner.website, owner.linkedin, owner.facebook, owner.youtube, owner.twitter, owner.bio]
      const currentFieldValues  = [name, username, email, location, instagram, website, linkedin, facebook, youtube, twitter, bio];

      // Add only updated fields to body = {}
      for (let i=0; i < currentFieldValues.length; i++){
         if (currentFieldValues[i] !== originalFieldValues[i]){
            body[fieldKeys[i]] = currentFieldValues[i];
         }
      }
      
      // Add Images if their was any change to it
      if (imageId){
         body["avatar"] = imageId;
      }

      if (Object.keys(body).length === 0) {
         setIsLoading(false)
         return
      };
      
      // Put request to update user information
      const res = await axios.put(`${process.env.REACT_APP_HOST_API}/users/${owner.id}`, body);
      if (res.data.invalid_fields){
         setIsLoading(false)
         displayPopup(res.data.invalid_fields[0])
      } else {
         setIsLoading(false)
         displayPopup("Profile was Successful! ✅")
         setTimeout(() => {
            navigate(`/users/${owner.id}`)
         }, 2000)
      }
   }


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
      <div className='edit-profile-react'>

         <HeaderSub owner={owner} setOwner={setOwner} />

         {selectedAvatar && <CropperPopup yourImg={selectedAvatar} setImage={setSelectedAvatar} setCroppedImage={setCroppedImage} isLoading={isCropperBtnLoading} setIsLoading={setIsCropperBtnLoading} />}


         {/* POP UP */}
         <div className="pop-up-container"></div>
         
         <main className="vh-90 t-pad-30">
         
            <div className="rl-wrapper">
               <div className="rl-container max-w-1000">
                  <form onSubmit={HandleSubmit}>
                     <div className="edit-profile-grid lr-pad-10 traditional-input">
                        
                        {/* SECTION: LEFT, IMAGE */}
                        <div className="ep-contianer-1 ep rl-fields">
                           
                           <div className="ep-img-container t-pad-15">
                              {owner && 
                              <div className="round-img-200 display-image" >
                                    {!newAvatar && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt='user' onClick={() => inputImageRef.current.click()} />}
                                    {newAvatar && <img src={newAvatar} alt='user' onClick={() => inputImageRef.current.click()} />}
                              </div>}
                           </div>
         
                           <p className="right-username cp pointer t-pad-10" onClick={() => inputImageRef.current.click()}>Change Picture</p>
                           {/* <input type="file" style={{display: "none"}} onChange={(e) => setAvatar(e.target.files[0])} /> */}
                           <input ref={inputImageRef} type='file' style={{display: 'none'}} onChange={(e) => setNewAvatarToImageReaderFormat(e.target.files)} />
                           
                        </div>
         
                        {/* SECTON: RIGHT, INFO FIELDS */}
                        <div className="ep-contianer-2 ep rl-fields">
                           <div className="ep-info-container">
                              <div className="ep-info-l1 r-pad-10">
                                 <label htmlFor="name">Name</label>
                                 <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                 <label htmlFor="username">username</label>
                                 <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                 <label htmlFor="email">email</label>
                                 <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                 <label htmlFor="location">location</label>
                                 <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                 <label htmlFor="instagram">instagram</label>
                                 <input type="text" name="instagram" id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                                 
                              </div>
                              <div className="ep-info-l2 l-pad-10">
                                 <label htmlFor="website">website</label>
                                 <input type="text" name="website" id="website"value={website} onChange={(e) => setWebsite(e.target.value)} />
                                 <label htmlFor="linkedin">linkedin</label>
                                 <input type="text" name="linkedin" id="linkedin"value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                 <label htmlFor="facebook">facebook</label>
                                 <input type="text" name="facebook" id="facebook"value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                                 <label htmlFor="youtube">youtube</label>
                                 <input type="text" name="youtube" id="youtube"value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                                 <label htmlFor="twitter">twitter</label>
                                 <input type="text" name="twitter" id="twitter"value={twitter} onChange={(e) => setTwitter(e.target.value)} />
         
                              </div>
                           </div>
                           <div className="bio-container">
                              <label htmlFor="bio">Bio</label>
                              <textarea name="bio" className="bio-textarea" value={bio} onChange={(e) => setBio(e.target.value)} ></textarea>
                              <div className="flex-right">
                                 {!isLoading && <button className="btn-square t-mar-10" onClick={(e) => {setIsLoading(true); HandleSubmit(e)}}>{owner ? 'Save' : 'Create'}</button>}
                                 {isLoading && 
                                 <button className="btn-square-loading t-mar-10" disabled>
                                       <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>
                                 </button>}
                              </div>
         
                           </div>
         
                        </div>
         
                     </div>
                  </form>
               </div>
            </div>

         </main>

      </div>
   )
}

export default EditProfile;