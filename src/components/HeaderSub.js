import { useState } from 'react'
import down from '../assets/images/icons/down.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useUrl } from '../hooks/useUrl';
import removeCookie from '../utils/removeCookie'

export const HeaderSub = ({owner}) => {
   const [enabledOptions, setEnabledOptions] = useState(false);
   const navigate = useNavigate()
   const {cloudinary_image_url} = useUrl()


   // LOGOUT
   const handleLogout = () => {
      removeCookie('usrin')
      navigate('/login')
   }

   return (
      <div className='header-sub-react'>
         <header className="content-wrapper">
            <div className="wrapper-rl max-w-1000"> 
               <div className="left">
                  <Link to="/">
                     <div className="logo-text">
                        <h1 title="Home">Let's Bl😉g.</h1>
                     </div>
                  </Link>
               </div>
               
               { owner && 
               <div className="right">
                  {/* Notification */}
                  <Link to={'/'} style={{height: "100%"}}>
                     <div className='right-item l-mar-40'>
                        <div className='rn-svg-center home-svg'>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                           </svg>
                        </div>
                        <div className='right-item-bottom'>
                           <p className='fs-14'>Home</p>
                        </div>
                     </div>
                  </Link>
                  <div className='right-item l-mar-40'>
                     <div className='rn-svg-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                           <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
                        </svg>
                     </div>
                     <div className='right-item-bottom'>
                        <p className='fs-14'>Notification</p>
                        {/* <svg className='l-mar-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                           <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                        </svg> */}
                     </div>
                  </div>
                  {/* User Option */}
                  <div className='right-item l-mar-40' onClick={() => setEnabledOptions(true)}>
                     <div className="round-img-35 r-mar-10">
                        {!owner.avatar && <h3 className="img-text">{owner.name[0].toUpperCase()}</h3>}
                        { owner.avatar && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt=''/>}
                     </div>
                     <div className='right-item-bottom'>
                        <p className='fs-14'>Me</p>
                        <svg className='l-mar-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                           <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                        </svg>
                     </div>
                  </div>

                  {/* POP UP container */}
                  {enabledOptions && 
                  <div className="pc-wrapper-2">
                     
                     {/* popup Content */}
                     <div className="up-card tb-pad-10">
                        <Link to={`/users/${owner.id}`}>
                           <div className='up-profile'>
                              <div className="round-img-50 r-mar-10">
                                 {!owner.avatar && <h3 className="img-text">{owner.name[0].toUpperCase()}</h3>}
                                 { owner.avatar && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt=''/>}
                              </div>
                              <div className='up-profile-name'>
                                 <h3>{owner ? owner.name : ''}</h3>
                                 <small>@{owner ? owner.username : ''}</small>
                              </div>

                           </div>
                        </Link>
                        <hr />
                        <Link to={`/users/${owner.id}`}><p>Profile</p></Link>
                        <Link to={"/create-blog"}><p>Create Blog</p></Link>
                        <Link to={"/manage-blogs"}><p>Manage Blogs</p></Link>
                        <hr />
                        <p className='pointer' onClick={handleLogout}>Logout</p>
                        
                     </div>

                  </div>}

               </div>}
            </div>
         </header>

         {enabledOptions && <div className="pc-bg-out" onClick={() => setEnabledOptions(false)}></div>}

      </div>
   )
}
