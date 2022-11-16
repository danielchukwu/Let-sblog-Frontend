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



const EditProfile = () => {
   const {data} = useFetch();
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

   // Insert Default Profile Information
   useEffect(() => {
      console.log(data)
      if (data){
         setName(data.owner.name)
         setUsername(data.owner.username)
         setEmail(data.owner.email)
         setLocation(data.owner.location)
         setInstagram(data.owner.instagram)
         setWebsite(data.owner.website)
         setLinkedin(data.owner.linkedin)
         setFacebook(data.owner.facebook)
         setYoutube(data.owner.youtube)
         setTwitter(data.owner.twitter)
         setBio(data.owner.bio)
      }
   }, [data])
   
   
   // Handle Form Submission
   const HandleSubmit = async (e) => {
      e.preventDefault();
      // Upload Image if any
      let imageId = await useCloudinary(avatar);
      // Body for updated fields only
      const body = {};
      
      // keys, original input values, current input values
      const fieldKeys = ['name', 'username', 'email', 'location', 'instagram', 'website', 'linkedin', 'facebook', 'youtube', 'twitter', 'bio'];
      const originalFieldValues = [data.owner.name, data.owner.username, data.owner.email, data.owner.location, data.owner.instagram, data.owner.website, data.owner.linkedin, data.owner.facebook, data.owner.youtube, data.owner.twitter, data.owner.bio]
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
      const res = await axios.put(`${process.env.REACT_APP_HOST_API}/users/${data.owner.id}`, body);
      if (res.data.invalid_fields){
         setIsLoading(false)
         displayPopup(res.data.invalid_fields[0])
      } else {
         setIsLoading(false)
         displayPopup("Profile was Successful! ✅")
         setTimeout(() => {
            navigate(`/users/${data.owner.id}`)
         }, 2000)
      }
   }

   
   // Preview Image
   useEffect(() => {
      // UPLOAD IMAGE: Preview
      const imageInput = document.querySelector('input[type="file"]');
      var uploaded_image = '';
      
      console.log(imageInput);
      imageInput.addEventListener("change", function() {
         const reader = new FileReader();
         reader.addEventListener('load', () => {
            uploaded_image = reader.result;
            document.querySelector('.display-image img').src = uploaded_image
         })
         reader.readAsDataURL(this.files[0])
      }, [data])

      // CLICK: Image Input
      const change_picture_btn = document.querySelector('.cp')

      change_picture_btn.addEventListener('click', function() {
         imageInput.click()
      })
   }, [])
   
   
   return (
      <div className='edit-profile-react'>

         <HeaderSub />

         {/* POP UP */}
         <div class="pop-up-container"></div>
         
         <main className="vh-90 t-pad-vh-10">
         
            <div className="rl-wrapper">
               <div className="rl-container max-w-1000">
                  <form onSubmit={HandleSubmit}>
                     <div className="edit-profile-grid lr-pad-10 traditional-input">
                        
                        {/* SECTION: LEFT, IMAGE */}
                        <div className="ep-contianer-1 ep rl-fields">
                           
                           <div className="ep-img-container t-pad-15">
                              {data && 
                              <div className="round-img-200 display-image">
                                 <img src={`${cloudinary_image_url}/${data.owner.avatar}`} alt='user' />
                              </div>}
                           </div>
         
                           <p className="right-username cp pointer t-pad-10">Change Picture</p>
                           <input type="file" style={{display: "none"}} onChange={(e) => setAvatar(e.target.files[0])} />
                           
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
                                 {!isLoading && <button className="btn-square t-mar-10" onClick={(e) => {setIsLoading(true); HandleSubmit(e)}}>{data ? 'Save' : 'Create'}</button>}
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