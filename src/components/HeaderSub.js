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
         <header class="content-wrapper">
            <div class="wrapper-rl max-w-1000"> 
               <div className="left">
                  <Link to="/">
                     <div className="logo-text">
                        <h1 title="Home">Let's Bl😉g.</h1>
                     </div>
                  </Link>
               </div>
               
               { owner && 
               <div className="right">
                  <Link to={`/users/${owner.id}`}><p  className="right-username">{owner.username}</p></Link>
                  <Link onClick={() => enabledOptions ? setEnabledOptions(false) :  setEnabledOptions(true)}>
                     <div className="round-img-40 r-mar-10">
                        {!owner.avatar && <p className="img-text">{owner.name[0].toUpperCase()}</p>}
                        { owner.avatar && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt=''/>}
                     </div>
                     <div className="svg-dropdown svg-15">
                        <img src={down} alt="" />
                     </div>
                  </Link>

                  {/* POP UP container */}
                  <div className="user-options-container">
                     { enabledOptions &&
                     <div className="user-options-wrapper">
                        <div className="flex-right content-wrapper max-w-1000">
                           <div className="up-card tb-pad-10">
                              <Link to={`/`}><p>Home</p></Link>
                              <Link to={`/users/${owner.id}`}><p>Profile</p></Link>
                              <Link to={"/create-blog"}><p>Create Blog</p></Link>
                              <Link to={"/manage-blogs"}><p>Manage Blogs</p></Link>
                              <hr />
                              <p className='pointer' onClick={handleLogout}>Logout</p>
                              
                           </div>
                        </div>
                     </div>}
                  </div>
               </div>}
            </div>
         </header>
      </div>
   )
}
