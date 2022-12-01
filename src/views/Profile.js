import { useLayoutEffect, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import BlogCard from '../components/BlogList';
import FooterMain from '../components/FooterMain';
import HeaderMain from '../components/HeaderMain';
import useFetch from '../hooks/useFetch';
import cover from '../assets/images/defaults/cover-image.jpg'
import gsap from 'gsap';


// Icons
import website_icon from '../assets/images/icons/www.svg'
import facebook_icon from '../assets/images/icons/facebook.svg'
import instagram_icon from '../assets/images/icons/instagram.svg'
import linkedin_icon from '../assets/images/icons/linkedin-in.svg'
import twitter_icon from '../assets/images/icons/twitter.svg'
import youtube_icon from '../assets/images/icons/youtube.svg'
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import { FollowPopup } from '../components/FollowPopup';
import { EditProfilePopup } from '../components/EditProfilePopup';

const Profile = () => {
   const {id} = useParams();
   const [showEditPopup, setShowEditPopup] = useState(false);
   const [showFollowPopup, setShowFollowPopup] = useState(false);
   const {data : user, setData : setUser} = useFetch(`/users/${id}`);
   const {data : owner, setData : setOwner} = useFetch(`/users/me`);
   const {data : blogs, setData : setBlogs} = useFetch(`/users/${id}/blogs`);
   const {cloudinary_image_url, host_url} = useUrl();
   const [type, setType] = useState();     // Either followers or following

   useEffect(() => {
      setTimeout(() => {
         window.scrollTo(0, 0);
      }, 1)
   }, [])

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


   useLayoutEffect(() => {
      const abortCont = new AbortController()
      gsap.from('main', {background: 'none', paddingTop: 250, duration: 0.5, ease: 'circ', opacity: 0})
      return () => abortCont.abort()
   }, [])

   return (
      <>

         {showEditPopup && <EditProfilePopup setShowEditPopup={setShowEditPopup} owner={owner} setOwner={setOwner} />}
         {showFollowPopup && type && <FollowPopup id={user.id} type={type} setShowFollowPopup={setShowFollowPopup} owner={owner}/>}   {/* type: following or followers */}
         
         <HeaderMain owner={owner ? owner : null} showRight={owner ? true : false} setOwner={setOwner}/>

         {/* POP UP */}
         <div class="pop-up-container"></div>


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
                              <div className='pp-bg'>
                                 <div className="round-pp-img">
                                    {/* {user && user.avatar && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="user dp" />} */}
                                    {user && !user.avatar && <h3 className="img-text">{user.name[0].toUpperCase()}</h3>}
                                    {user && user.avatar && <img src={`${cloudinary_image_url}/${user.avatar}`} alt=''/>}
                                 </div>
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
                        <div className="info-items t-pad-10">
                           {user && user.skills.map(skill => <span key={skill.id}>{skill} | </span>)}
                        </div>
                     </div>
                     
                     <div className="info-card b-mar-25">
                        <h3>Contact</h3>
                        <div className="info-items t-pad-10">
                           <ul>
                              {/* Website */}
                              {user && user.website &&
                              <Link to={user.website}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={website_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Website</span>
                                 </li>
                              </Link>}
                              {/* Facebook */}
                              {user && user.facebook &&
                              <Link to={user.facebook}>
                                 <li className="info-item t-pad-15">
                                    <div className="svg-s">
                                       <img src={facebook_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Facebook</span>
                                 </li>
                              </Link>}
                              {/* Twitter */}
                              {user && user.twitter &&
                              <Link to={user.twitter}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={twitter_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Twitter</span>
                                 </li>
                              </Link>}
                              {/* Instagram */}
                              {user && user.instagram &&
                              <Link to={user.instagram}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={instagram_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Instagram</span>
                                 </li>
                              </Link>}
                              {user && user.linkedin &&
                              <Link to={user.linkedin}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={linkedin_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">linkedin</span>
                                 </li>
                              </Link>}
                              {user && user.youtube &&
                              <Link to={user.youtube}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={youtube_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">youtube</span>
                                 </li>
                              </Link>}
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

export default Profile;