import { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import BlogCard from '../../components/Blogs/BlogList';
import FooterMain from '../../components/FooterMain';
import HeaderMain from '../../components/HeaderMain';
import useFetch from '../../hooks/useFetch';
import cover from '../../assets/images/defaults/cover-image.jpg'
import gsap from 'gsap';

//
import { useUrl } from '../../hooks/useUrl';
import getCookie from '../../utils/getCookie';
import { FollowPopup } from '../../components/FollowPopup';
import { EditProfilePopup } from '../../components/EditProfilePopup';
import CropperPopup from '../../components/CropperPopup';
import { useCloudinary } from '../../hooks/useCloudinary';
import displayPopup from '../../utils/displayPopup';
import { ExternalLink } from 'react-external-link';


const ProfilePage = () => {
   const {id} = useParams();
   const [showEditPopup, setShowEditPopup] = useState(false);
   const [showFollowPopup, setShowFollowPopup] = useState(false);
   const {data : user, setData : setUser} = useFetch(`/users/${id}`);
   const {data : owner, setData : setOwner} = useFetch(`/users/me`);
   const {data : blogs, setData : setBlogs} = useFetch(`/users/${id}/blogs`);
   const {cloudinary_image_url, host_url} = useUrl();
   const [type, setType] = useState();     // Either followers or following
   const [isLoading, setIsLoading] = useState();

   // Changing profile picture related states
   const [newAvatar, setNewAvatar] = useState();
   const inputImageRef = useRef();
   const [croppedImage, setCroppedImage] = useState();


   // Handle croppedImage by
   // Sending to cloudinary and getting back the images url
   // Then sending it to the database 
   useEffect(() => {
      if (croppedImage) {
         HandleAvatarUpload();
      }
   }, [croppedImage])


   const HandleAvatarUpload = async () => {
      // console.log("Image Successfully Cropped!");
      // console.log(croppedImage);
      const croppedImageFile = new File([croppedImage], 'croppedImage')
      let imageUrl = await useCloudinary(croppedImageFile);

      console.log('image');
      console.log(imageUrl);
      if (imageUrl) {
         // const res = await SendPost('/users/avatar', {'avatar': imageUrl});
         // console.log(res);
         const body = {'avatar': imageUrl};
         fetch(`${host_url}/users/avatar`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            // update profile picture
            const newData = user;
            user.avatar = imageUrl;
            setUser({...newData});
            // close edit profile picture popup
            setNewAvatar(null);
         }).catch(e => {
            console.log(e);
         })
      } else {
         // show pop up if image wasn't saved
         displayPopup("Something went wrong. Try again!");
         setIsLoading(false);
      }
   }


   useEffect(() => {
      setTimeout(() => {
         window.scrollTo(0, 0);
      }, 1)
   }, [])

   // Handle Image Upload to Cropper Component
   // To crop image before upload
   function HandleImageUpload (data) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
         setNewAvatar(reader.result);
      })
      reader.readAsDataURL(data[0]);
   }

   const HandleFollow = () => {
      // update follow state
      const follow = !user.following;
      const newData = user;
      newData.following = ! newData.following;
      if (newData.following){
         newData.followers_count += 1;
      } else {
         newData.followers_count -= 1;
      }
      setUser({...newData});

      // follow or unfollow
      const body = {'follow': follow, 'leader_id': user.id};
         fetch(`${host_url}/users/follow`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => {
            return res.json();
         })
         .then(data => {
            console.log(data);
         })
   }

   
   useEffect(() => {
      console.log(inputImageRef)
   }, [inputImageRef])


   useLayoutEffect(() => {
      const abortCont = new AbortController()
      gsap.from('main', {background: 'none', paddingTop: 250, duration: 0.5, ease: 'circ', opacity: 0})
      return () => abortCont.abort()
   }, [])

   return (
      <>

         {showEditPopup && <EditProfilePopup setShowEditPopup={setShowEditPopup} owner={owner} setOwner={setOwner} />}
         {showFollowPopup && type && <FollowPopup id={user.id} type={type} setShowFollowPopup={setShowFollowPopup} owner={owner}/>}   {/* type: following or followers */}

         {newAvatar && <CropperPopup yourImg={newAvatar} setImage={setNewAvatar} setCroppedImage={setCroppedImage} isLoading={isLoading} setIsLoading={setIsLoading} />}
         
         <HeaderMain owner={owner ? owner : null} showRight={owner ? true : false} setOwner={setOwner}/>
         

         {/* POP UP */}
         <div className="pop-up-container"></div>


         <main className="profile-react t-pad-200" style={{opacity: 1}}>
            <div className="content-wrapper max-w-1000">

               <div className="profile-grid">

                  <div className="pm-wrapper">

                     <div className="pm-top-1">
                        <div className="pm-top">
                           <div className="slide-img">

                              {user && <img src={cover} alt="cover" />}
                              {user && <img src={user.cover} alt="cover" />}

                           </div>
                        </div>
                        <div className="pm-bottom">
                           {/* PROFILE PICTURE */}
                           <div className="profile-img-container">
                              <div className='pp-bg pointer'>
                                 <div className="round-pp-img" onClick={() => inputImageRef.current.click()}>
                                    {/* {user && user.avatar && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="user dp" />} */}
                                    {user && !user.avatar && <h3 className="img-text">{user.name[0].toUpperCase()}</h3>}
                                    {user && user.avatar && <img src={`${cloudinary_image_url}/${user.avatar}`} alt=''/>}
                                 </div>
                                 <input ref={inputImageRef} type='file' style={{display: 'none'}} onChange={(e) => HandleImageUpload(e.target.files)} />
                              </div>
                           </div>
                     
                           {/* NAME, OCCUPATION, FOLLOW */}
                           {user &&
                           <div className="pm-intro-container l-pad-20">
                              <h1>{user.name}</h1>
                              <p className="t-pad-5">{user.occupation} at {user.company}</p>
                              
                              {/* <!-- Follow & Edit --> */}
                              <div className="pm-bottom-l2">
                                 <div className="flex-a-center t-pad-5">
                                    <span className='pointer' onClick={() => {setShowFollowPopup(true); setType('followers');}}>{user.followers_count} followers</span>
                                    <span className="dot"></span>
                                    <span className='pointer' onClick={() => {setShowFollowPopup(true); setType('following');}}>{user.following_count} following</span>
                                 </div>


                                 {owner && user && owner.id !== user.id && !user.following && <span className="btn-f" onClick={() => HandleFollow()}>follow</span>}
                                 {owner && user && owner.id !== user.id &&  user.following && <span className="btn-f-clicked" onClick={() => HandleFollow()}>following</span>}
                                 {owner && user && owner.id == id && <Link to={`/edit-profile`}><p className="btn-edit-profile">Edit Profile</p></Link>}
                              </div>
                           </div>}

                        </div>
                     </div>

                     {/* ABOUT SECTION */}
                     <div className="pm-top-2 t-mar-25">

                        <div className="user-card">
                           <div className="user-card-top">
                              <div className="card-title">
                                 <h3>About</h3>
         
                              </div>
                           </div>
                           <div className="user-card-body t-pad-10">
                              {user && <p>{user.bio}</p>}
                           </div>
                           <div className="user-card-footer t-pad-25">
                              {user && <em>{user.username} said.</em>}
                           </div>
                        </div>

                     </div>

                     {/* BLOGS SECTION */}
                     <div className="pm-blogs t-mar-25">
                        <div className="grid-wrapper-2-col">
                           
                           {blogs && <BlogCard blogs={blogs} />}

                        </div>
                     </div>

                  </div>

                  {/* SKILLS & CONTACT INFO */}
                  <div className="pm-right-wrapper">
                     
                     <div className="info-card b-mar-25">
                        <div className='ic-title'>
                           <h3>Skills</h3>
                           {owner && user && owner.id === user.id &&
                           <div className='add-skills' onClick={() => setShowEditPopup(true)}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                 <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                              </svg>
                           </div>}
                        </div>
                        <div className="skill-items t-pad-10">
                           {user && user.skills.map(skill => <span key={skill.id}>{skill}</span>)}
                        </div>
                     </div>
                     
                     <div className="info-card b-mar-25">
                        <h3>Contact</h3>
                        <div className="info-items t-pad-5">
                           <ul>
                              {/* Website */}
                              {user && user.website &&
                              <ExternalLink href={user.website} target="_blank">
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                          <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>
                                       </svg>
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Website</span>
                                 </li>
                              </ExternalLink>}
                              {/* Facebook */}
                              {user && user.facebook &&
                              <ExternalLink href={user.facebook} target="_blank">
                                 <li className="info-item t-pad-15">
                                    <div className="svg-s">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                                       </svg>
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Facebook</span>
                                 </li>
                              </ExternalLink>}
                              {/* Twitter */}
                              {user && user.twitter &&
                              <ExternalLink href={user.twitter} target="_blank">
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                                       </svg>
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Twitter</span>
                                 </li>
                              </ExternalLink>}
                              {/* Instagram */}
                              {user && user.instagram &&
                              <ExternalLink href={user.instagram} target="_blank">
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                                       </svg>
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Instagram</span>
                                 </li>
                              </ExternalLink>}
                              {user && user.linkedin &&
                              <ExternalLink href={user.linkedin} target="_blank">
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                                       </svg>
                                    </div>
                                    <span className="l-pad-10 b-mar-3">linkedin</span>
                                 </li>
                              </ExternalLink>}
                              {user && user.youtube &&
                              <ExternalLink href={user.youtube} target="_blank">
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                                       </svg>
                                    </div>
                                    <span className="l-pad-10 b-mar-3">youtube</span>
                                 </li>
                              </ExternalLink>}
                           </ul>
                        </div>
                     </div>
                     
                  </div>

               </div>
               
            </div>
         </main>
         
         
         <FooterMain />
      </>
   )
}

export default ProfilePage;