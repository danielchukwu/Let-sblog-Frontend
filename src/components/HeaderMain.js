import { Link, useNavigate } from 'react-router-dom'
import { gsap } from "gsap";
import { useEffect, useState } from 'react';
import down from '../assets/images/icons/down.svg'
import removeCookie from '../utils/removeCookie'

// This Header is for users that are either logged in or not
const HeaderMain = ({owner}) => {
   const [enabledOptions, setEnabledOptions] = useState(false);
   const navigate = useNavigate()

   // login_sign_up_btn, user_profile_btn,
   useEffect(() => {
      const handleScroll = e => {
         if (window.pageYOffset >= 20){
            gsap.to('.header', {background: '#00ABB3',duration: 0.3, opacity: 1, ease: 'power1.out', boxShadow: 'rgba(0,0,0,0.3) 0px 1px'})
            gsap.to('.wrapper', {padding: '10px 0', duration: 0.3})
            gsap.to('.right-username', {duration: 0.25, color: "#fff"})
            gsap.to('.logo-text h1', {fontSize: '2.2rem', duration: 0.25, color: "#fff"})
            gsap.to('.btn', {borderRadius: 0, color: '#fff', duration: 0.3})
         }
         else if (window.pageYOffset < 19){
            gsap.to('.header', {background: '#f0f1f3', duration: 0.3, opacity: 1, boxShadow: 'none'})
            gsap.to('.wrapper', {padding: '50px 0', duration: 0.3, ease: 'power1.out'})
            gsap.to('.right-username', {duration: 0.25, color: "#000"})
            gsap.to('.logo-text h1', {fontSize: '3rem',  color: '#000', duration: 0.3})
            gsap.to('.btn', {borderRadius: '20', color: '#fff', duration: 0.3})
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
      window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   // LOGOUT
   const handleLogout = () => {
      removeCookie('usrin')
      navigate('/login')
   }
   

   return (
      <header className="header content-wrapper">
         <div className="wrapper max-w-1000">
            <div className="left">
               <Link to="/">
                  <div className="logo-text">
                     <h1 title="Home">Let's Bl😉g.</h1>
                  </div>
               </Link>
            </div>
            {! owner &&
            <div className="right">
               <Link to="/login"><span className="btn">Login</span></Link>
               <Link to="/sign-up"><span className="btn l-mar-10">Sign Up</span></Link>
            </div>}

            { owner && 
            <div className="right">
               <Link to={`/users/${owner.id}`}><p  className="right-username">{owner.username}</p></Link>
               <Link onClick={() => enabledOptions ? setEnabledOptions(false) :  setEnabledOptions(true)}>
                  <div className="round-img-40 r-mar-10">
                     {!owner.avatar && <p className="img-text">{owner.name[0].toUpperCase()}</p>}
                     { owner.avatar && <img src={owner.avatar} alt=''/>}
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
   )
}

export default HeaderMain