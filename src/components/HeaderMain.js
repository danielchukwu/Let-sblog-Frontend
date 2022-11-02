import { Link } from 'react-router-dom'
import { gsap } from "gsap";
import { useEffect } from 'react';

// This Header is for users that are either logged in or not
const HeaderMain = (isLoggedIn=false) => {
   // login_sign_up_btn, user_profile_btn,
   useEffect(() => {
      const handleScroll = e => {
         if (window.pageYOffset >= 20){
            gsap.to('.header', {background: '#00ABB3',duration: 0.3, opacity: 1, ease: 'power1.out', borderBottom: '1px solid #fafafa'})
            gsap.to('.wrapper', {padding: '10px 0', duration: 0.3})
            gsap.to('.logo-text h1', {fontSize: '2.2rem', duration: 0.25, color: "#fff"})
            gsap.to('.btn', {borderRadius: 0, color: '#fff', duration: 0.3})
         }
         else if (window.pageYOffset < 19){
            gsap.to('.header', {background: '#f0f1f3', duration: 0.3, opacity: 1, borderBottom: 'none'})
            gsap.to('.wrapper', {padding: '50px 0', duration: 0.3, ease: 'power1.out'})
            gsap.to('.logo-text h1', {fontSize: '3rem',  color: '#000', duration: 0.3})
            gsap.to('.btn', {borderRadius: '20', color: '#fff', duration: 0.3})    
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
      window.removeEventListener('scroll', handleScroll)
      }
   })

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
            {isLoggedIn && 
            <div className="right">
               <Link to="/login"><span className="btn">Login</span></Link>
               <Link to="/sign-up"><span className="btn l-mar-10">Sign Up</span></Link>
            </div>}
         </div>
      </header>
   )
}

export default HeaderMain