import { useLayoutEffect, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import BlogCard from '../components/BlogList';
import FooterMain from '../components/FooterMain';
import HeaderMain from '../components/HeaderMain';
import useFetch from '../hooks/useFetch';
import cover from '../assets/images/defaults/cover-image.jpg'
import gsap from 'gsap';


// Icons
import website_icon from '../assets/images/icons/www.svg'
import { useUrl } from '../hooks/useUrl';

const Profile = () => {
   const {id} = useParams()
   const {data} = useFetch(`/users/${id}`)
   const {cloudinary_image_url} = useUrl();

   useEffect(() => {
      setTimeout(() => {
         window.scrollTo(0, 0);
      }, 1)
   }, [])


   useLayoutEffect(() => {
      const abortCont = new AbortController()
      gsap.from('main', {background: 'none', paddingTop: 250, duration: 0.5, ease: 'circ', opacity: 0})
      return () => abortCont.abort()
   }, [])

   return (
      <div>
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
                           <div class="profile-img-container">
                              <div class="round-img-l">
                                 {data && data.user.avatar && <img src={`${cloudinary_image_url}/${data.user.avatar}`} alt="user dp" />}
                              </div>
                           </div>
                     
                           {/* NAME, OCCUPATION, FOLLOW */}
                           {data &&
                           <div class="pm-intro-container l-pad-20">
                              <h1>{data.user.name}</h1>
                              <p class="t-pad-5">{data.user.occupation} at {data.user.company}</p>
                              
                              {/* <!-- Follow & Edit --> */}
                              <div class="pm-bottom-l2">
                                 <div class="flex-a-center t-pad-5">
                                    <span>0 followers</span>
                                    <span class="dot"></span>
                                    <span>3 following</span>
                                 </div>


                                 {/* <span class="btn-f">follow</span>
                                 <span class="btn-f-clicked">following</span> */}
                                 {data && data.owner.id == id && <Link to={`/edit-profile`}><p class="btn-edit-profile">Edit Profile</p></Link>}
                              </div>
                           </div>}

                        </div>
                     </div>

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

                     <div className="pm-blogs t-mar-25">
                        <div className="grid-wrapper-2-col">
                           
                           {data && <BlogCard blogs={data.blogs} />}

                        </div>
                     </div>

                  </div>

                  <div className="pm-right-wrapper">
                     
                     <div className="info-card b-mar-25">
                        <h3>Skills</h3>
                        <div className="info-items t-pad-10">
                           {data && data.user.skills.map(skill => <span>{skill} | </span>)}
                        </div>
                     </div>
                     
                     <div className="info-card b-mar-25">
                        <h3>Contact</h3>
                        <div className="info-items t-pad-10">
                           <ul>
                              {data && data.user.website &&
                              <li className="info-item">
                                 <div className="svg-s">
                                    <img src={website_icon} alt="" />
                                 </div>
                                 <span className="l-pad-10 b-mar-7">Website</span>
                              </li>}
                           </ul>
                        </div>
                     </div>
                     
                  </div>

               </div>
               
            </div>
         </main>
         
         <FooterMain />
      </div>
   )
}

export default Profile;