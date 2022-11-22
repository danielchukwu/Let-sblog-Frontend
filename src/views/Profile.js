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

const Profile = () => {
   const {id} = useParams();
   const [showFollowPopup, setShowFollowPopup] = useState(false);
   const {data, setData} = useFetch(`/users/${id}`);
   const {cloudinary_image_url, host_url} = useUrl();

   useEffect(() => {
      setTimeout(() => {
         window.scrollTo(0, 0);
      }, 1)
   }, [])

   const HandleFollow = (followe) => {
      // update follow state
      const follow = !data.user.following;
      const newData = data;
      newData.user.following = ! newData.user.following;
      if (newData.user.following){
         newData.user.followers_count += 1;
      } else {
         newData.user.followers_count -= 1;
      }
      setData({...newData});

      // follow or unfollow
      const body = {'follow': follow, 'leader_id': data.user.id};
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
         <div className="popup-center-container">

            {showFollowPopup && 
            <div className="pc-wrapper">

               {/* Following Content */}
               <div className='f-container z-index-2'>
                  <div className='f-box'>
                     <div className='f-title'>
                        {/* <h3>followers</h3> */}
                        <h3>following</h3>
                        <span className='f-cancel' onClick={() => setShowFollowPopup(false)}>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                           </svg>
                        </span>
                     </div>

                     <div className='f-body-container'>
                        {/* user item */}
                        
                        <div className='fb-item t-pad-15'>
                           <div className="round-img-45">
                              {data && <img src={`${cloudinary_image_url}/${data.user.avatar}`} alt="" />}
                           </div>
                           <div className='fb-username l-pad-10'>
                              <h3>danielcarl4u_</h3>
                              <p>Daniel Chukwu</p>
                           </div>
                           <div className='fb-follow'>
                              {/* <span className='btn-f'>follow</span> */}
                              <span className='btn-f-clicked'>following</span>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
               
               {/* Dark Background */}
               <div className="pc-bg z-index-1"onClick={() => setShowFollowPopup(false)}></div>
            </div>}

         </div>
         
         <HeaderMain owner={data ? data.owner : null} showRight={data ? true : false} />

         

         <main className="profile-react t-pad-200" style={{opacity: 1}}>
            <div className="content-wrapper max-w-1000">

               <div className="profile-grid">

                  <div className="pm-wrapper">

                     <div className="pm-top-1">
                        <div className="pm-top">
                           <div className="slide-img">

                              {data && <img src={cover} alt="cover" />}
                              {data && <img src={data.user.cover} alt="cover" />}

                           </div>
                        </div>
                        <div className="pm-bottom">
                           {/* PROFILE PICTURE */}
                           <div className="profile-img-container">
                              <div className="round-img-l">
                                 {data && data.user.avatar && <img src={`${cloudinary_image_url}/${data.user.avatar}`} alt="user dp" />}
                              </div>
                           </div>
                     
                           {/* NAME, OCCUPATION, FOLLOW */}
                           {data &&
                           <div className="pm-intro-container l-pad-20">
                              <h1>{data.user.name}</h1>
                              <p className="t-pad-5">{data.user.occupation} at {data.user.company}</p>
                              
                              {/* <!-- Follow & Edit --> */}
                              <div className="pm-bottom-l2">
                                 <div className="flex-a-center t-pad-5">
                                    <span className='pointer' onClick={() => setShowFollowPopup(true)}>{data.user.followers_count} followers</span>
                                    <span className="dot"></span>
                                    <span className='pointer' onClick={() => setShowFollowPopup(true)}>{data.user.following_count} following</span>
                                 </div>


                                 {data && data.owner.id !== data.user.id && !data.user.following && <span className="btn-f" onClick={() => HandleFollow(true)}>follow</span>}
                                 {data && data.owner.id !== data.user.id &&  data.user.following && <span className="btn-f-clicked" onClick={() => HandleFollow(false)}>following</span>}
                                 {data && data.owner.id == id && <Link to={`/edit-profile`}><p className="btn-edit-profile">Edit Profile</p></Link>}
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
                              {data && <p>{data.user.bio}</p>}
                           </div>
                           <div className="user-card-footer t-pad-25">
                              {data && <em>{data.user.username} said.</em>}
                           </div>
                        </div>

                     </div>

                     {/* BLOGS SECTION */}
                     <div className="pm-blogs t-mar-25">
                        <div className="grid-wrapper-2-col">
                           
                           {data && <BlogCard blogs={data.blogs} />}

                        </div>
                     </div>

                  </div>

                  {/* SKILLS & CONTACT INFO */}
                  <div className="pm-right-wrapper">
                     
                     <div className="info-card b-mar-25">
                        <h3>Skills</h3>
                        <div className="info-items t-pad-10">
                           {data && data.user.skills.map(skill => <span key={skill.id}>{skill} | </span>)}
                        </div>
                     </div>
                     
                     <div className="info-card b-mar-25">
                        <h3>Contact</h3>
                        <div className="info-items t-pad-10">
                           <ul>
                              {/* Website */}
                              {data && data.user.website &&
                              <Link to={data.user.website}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={website_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Website</span>
                                 </li>
                              </Link>}
                              {/* Facebook */}
                              {data && data.user.facebook &&
                              <Link to={data.user.facebook}>
                                 <li className="info-item t-pad-15">
                                    <div className="svg-s">
                                       <img src={facebook_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Facebook</span>
                                 </li>
                              </Link>}
                              {/* Twitter */}
                              {data && data.user.twitter &&
                              <Link to={data.user.twitter}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={twitter_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Twitter</span>
                                 </li>
                              </Link>}
                              {/* Instagram */}
                              {data && data.user.instagram &&
                              <Link to={data.user.instagram}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={instagram_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">Instagram</span>
                                 </li>
                              </Link>}
                              {data && data.user.linkedin &&
                              <Link to={data.user.linkedin}>
                                 <li className="info-item  t-pad-15">
                                    <div className="svg-s">
                                       <img src={linkedin_icon} alt="" />
                                    </div>
                                    <span className="l-pad-10 b-mar-3">linkedin</span>
                                 </li>
                              </Link>}
                              {data && data.user.youtube &&
                              <Link to={data.user.youtube}>
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