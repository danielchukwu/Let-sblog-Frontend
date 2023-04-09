import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderLogin from '../../components/HeaderLogin'
import developer from '../../assets/images/defaults/developer.png';
import { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import gsap from 'gsap'
import displayPopup from '../../utils/displayPopup'
import removeCookie from '../../utils/removeCookie'
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../../hooks/useConstants'


const LoginPage = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const {spinnerStyle} = useConstants();
   const navigate = useNavigate();

   useEffect(() => {
      removeCookie('usrin')
   }, [])
   
   const HandleSubmit = async (e) => {
      e.preventDefault()
      useLogin(username, password)
      .then(res => {
         setIsLoading(false);
         // if (res){navigate('/')} else {displayPopup();}
         if (res){navigate('/')} else {displayPopup("Invalid Username and Password!");}
      })
      .catch(err => {
         setIsLoading(false);
         displayPopup("Network Error!");
      })
   }


   return (
      <div className='login'>
         <HeaderLogin />

         {/* POP UP */}
         <div class="pop-up-container"></div>

         <main className="vh-90 t-pad-30">
      
            <div className="rl-wrapper">
               <div className="rl-container max-w-1000">
                  <div className="rl-grid-container">
                     <div className="left-rl">
                        <div className="rl-image">
                           <img src={developer} alt="illustration" />
                        </div>
                     </div>

                     <div className="right-rl traditional-input">
                        <div className="form-container">
                           <div className="form-intro">
                              <h1 title="Home">Login</h1>
                           </div>
                           <form method='POST' onSubmit={(e) => HandleSubmit(e)}>
                              <div className="rl-fields t-mar-10">
                                 <label htmlFor="username">Username</label>
                                 <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                 
                                 <label htmlFor="password">Password</label>
                                 <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
         
                                 {!isLoading && <button className="btn-square t-mar-25" onClick={(e) => {setIsLoading(true); HandleSubmit(e)}}>Login</button>}
                                 {isLoading && 
                                 <button className="btn-square-loading t-mar-25" disabled>
                                       <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>
                                 </button>}
         
                                 <p className="t-mar-25">Don't have an account. <Link to="/sign-up">Sign up</Link></p>
                                 
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </main>

      </div>
   )
}

export default LoginPage