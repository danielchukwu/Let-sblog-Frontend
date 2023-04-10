import { Link, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { createContext, useEffect, useState } from 'react';
import down from '../assets/images/icons/down.svg';
import removeCookie from '../utils/removeCookie';
import { useUrl } from '../hooks/useUrl';
import { UserOptionsDropdown } from './UserOptionsDropdown';
import { NotificatiosDropdown as NotificationsDropdown } from './NotificatiosDropdown';
import DisplaySvg from './images/DisplaySvg';
import { homeIcon, notificationIcon, downArrowIcon } from '../Constraints';
import DisplayImg from './images/DisplayImg';

export const HeaderContext = createContext(); 

// This Header is for users that are either logged in or not
const HeaderMain = ({owner, showRight=true, setOwner}) => {
   const navigate = useNavigate();
   const {cloudinary_image_url} = useUrl();
   const [enableOptionsDropdown, setEnableOptionsDropdown] = useState(false);
   const [enableNotificationDropdown, setEnableNotificationDropdown] = useState(false);
   

   // login_sign_up_btn, user_profile_btn,
   useEffect(() => {
      const handleScroll = e => {
         if (window.screen.width > 769) {
            if (window.pageYOffset >= 20){
               gsap.to('.header', {background: '#00ABB3',duration: 0.3, opacity: 1, ease: 'power1.out'})
               gsap.to('.wrapper', {padding: '10px 0', duration: 0.3})
               gsap.to('.right-username', {duration: 0.25, color: "#fff"})
               gsap.to('.logo-text h1', {fontSize: '2.2rem', duration: 0.25, color: "#fff"})
               gsap.to('.btn', {borderRadius: 0, color: '#fff', duration: 0.3})
               gsap.to('.right-item svg, .right-item p', {color: '#fff', fill: '#fff', duration: 0.3})
               gsap.to('.ndw', {background: '#00ABB3', duration: 0.3})
            }
            else if (window.pageYOffset < 19){
               gsap.to('.header', {background: '#f0f1f3', duration: 0.3, opacity: 1})
               gsap.to('.wrapper', {padding: '50px 0', duration: 0.3, ease: 'power1.out'})
               gsap.to('.right-username', {duration: 0.25, color: "#000"})
               gsap.to('.logo-text h1', {fontSize: '3rem',  color: '#000', duration: 0.3})
               gsap.to('.btn', {borderRadius: '20', color: '#fff', duration: 0.3})
               gsap.to('.right-item svg, .right-item p', {color: '#000', fill: '#3c4048', duration: 0.3})
               gsap.to('.ndw', {background: '#f0f1f3', duration: 0.3})
            }
            
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
      window.removeEventListener('scroll', handleScroll)
      }
   }, [])


   // LOGOUT
   const handleLogout = () => {
      removeCookie('usrin');
      navigate('/login');
   }
   
   return (
      <HeaderContext.Provider value={ setEnableNotificationDropdown }>

         {enableNotificationDropdown && <div className="pc-bg-out" onClick={() => setEnableNotificationDropdown(false)}></div>}
         {enableOptionsDropdown && <div className="pc-bg-out" onClick={() => setEnableOptionsDropdown(false)}></div>}
         
         <header className="header" onClick={() => {
            // if (enableOptionsDropdown) {
            //    setEnableOptionsDropdown(false);
            // }
            // if (enableNotificationDropdown) {
            //    setEnableNotificationDropdown(false)
            // }
         }}>
            <div className="wrapper">
               <div className="left">
                  <Link to="/">
                     <div className="logo-text">
                        <h1 title="Home">Let's Bl😉g.</h1>
                     </div>
                  </Link>
               </div>
               {! owner && showRight &&
               <div className="right">
                  <Link to="/login"><span className="btn">Login</span></Link>
                  <Link to="/sign-up"><span className="btn l-mar-10">Sign Up</span></Link>
               </div>}

               { owner !== null && 
               <div className="right">
                  {/* Home */}
                  <Link to={'/'} style={{height: "100%"}}>
                     <div className='right-item l-mar-40'>
                        <DisplaySvg svg={homeIcon} selector={'rn-svg-center home-svg'} />
                        <div className='right-item-bottom'>
                           <p className='fs-14'>Home</p>
                        </div>
                     </div>
                  </Link>
                  {/* Notification */}
                  <div className='right-item l-mar-40' onClick={() => {setEnableNotificationDropdown( !enableNotificationDropdown ); setEnableOptionsDropdown(false);}}>
                     <div className='rn-svg-center pos-rel t-pad-3'>
                        {owner.notifications_count > 0 && 
                        <div className='ndw'>
                           <div className='noti-dot'></div>
                        </div>}
                        <DisplaySvg svg={notificationIcon} />
                     </div>
                     <div className='right-item-bottom'>
                        <p className='fs-14'>Notifications</p>
                     </div>
                  </div>

                  {/* Notification Dropdown */}
                  {enableNotificationDropdown && 
                     <NotificationsDropdown owner={owner} setOwner={setOwner} setEnableNotificationDropdown={setEnableNotificationDropdown} />
                  }

                  
                  {/* User Option */}
                  <div className='right-item l-mar-40' onClick={() => {setEnableOptionsDropdown(!enableOptionsDropdown); setEnableNotificationDropdown(false);}}>
                     <div className='rn-svg-center'>
                        <div className="round-img-35">
                           {/* {!owner.avatar && <h3 className="img-text">{owner.name[0].toUpperCase()}</h3>}
                           { owner.avatar && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt=''/>} */}
                           <DisplayImg selector="img-text" img={owner.avatar} name={owner.name} alt="profile image"/>

                        </div>
                     </div>
                     <div className='right-item-bottom'>
                        <p className='fs-14'>Me</p>
                        <DisplaySvg svg={downArrowIcon} />
                     </div>
                  </div>

                  {/* User Options Dropdown */}
                  {enableOptionsDropdown && 
                     <UserOptionsDropdown owner={owner} handleLogout={handleLogout} setEnableOptionsDropdown={setEnableOptionsDropdown} />
                  }


               </div>}
            </div>
         </header>

      </HeaderContext.Provider>
   )
}

export default HeaderMain