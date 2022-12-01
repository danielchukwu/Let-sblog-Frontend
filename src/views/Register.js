import { Link, useNavigate } from 'react-router-dom'
import HeaderLogin from '../components/HeaderLogin'
import developer from '../assets/images/defaults/developer.png'
import { useState, useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import displayPopup from '../utils/displayPopup'
import { useConstants } from '../hooks/useConstants'
import { ClipLoader } from 'react-spinners';
// import usePost from '../hooks/usePost'

const Register = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [username, setUsername] = useState()
   const [name, setName] = useState()
   const [email, setEmail] = useState()
   const [occupation, setOccupation] = useState()
   const [company, setCompany] = useState()
   const [password, setPassword] = useState()

   
   const [message, setMessage] = useState(null)
   const [successful, setSuccessful] = useState(false)
   const {spinnerStyle} = useConstants();
   const navigate = useNavigate()
   

   // Handle Registration Form Submission
   const HandleSubmit = (e) => {
      e.preventDefault()

      const body = {username: username, name: name, email: email, occupation: occupation, company: company, password: password}
      console.log(body)

      fetch(`${process.env.REACT_APP_HOST_API}/register`, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(body)
      })
         .then(res => {
            if (!res.ok) {throw Error("Some error occurred with the json response")}
            return res.json()
         })
         .then(data => {
            if (data.message){
               console.log(`Invalid Fields: ${data.message}`)
               setMessage(data.message)
               setIsLoading(false);
               displayPopup(data.message[0])
            } else {
               Login()
            }
         })
         .catch(err => {
            console.log(err.message)
         })
      // usePost(body, '/register')
   }

   
   // Login OR Display Pop up
   function Login() {
      useLogin(username, password)
         .then(res => {
            if (res){
               setIsLoading(false);
               displayPopup('successful_registration');
               setTimeout(() => {
                  navigate('/');
               }, 2000)
            }
         })
   }
   

   return (
      <div className='register'>
         <HeaderLogin />
         
         {/* POP UP */}
         <div class="pop-up-container"></div>

         <main className="vh-90 t-pad-vh-10">
      
            <div className="rl-wrapper">
               <div className="rl-container max-w-1000">
                  <div className="rl-grid-container">
                     <div className="left-rl">
                        <div className="rl-image">
                           <img src={developer} alt="illustration"/>
                        </div>
                     </div>

                     <div className="right-rl  traditional-input">
                        <div className="form-container">
                           <div className="form-intro">
                              <h1 title="Home">Create Account</h1>
                              <p className="t-pad-10">Join us today and start writing amazing Bl😉gs.</p>
                           </div>
                           <form onSubmit={(e) => HandleSubmit(e)}>
                              <div className="rl-fields t-mar-10">
                                 <label htmlFor="username">Username</label>
                                 <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                 
                                 <div className="grid-input-2">
                                    <label htmlFor="name">Name</label>
                                    <label htmlFor="email">Email</label>
                                    
                                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                 </div>
                                 
                                 <div className="grid-input-2">
                                    <label htmlFor="occupation">Occupation</label>
                                    <label htmlFor="company">Where do you work?</label>
                                    
                                    <input type="text" name="occupation" id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
                                    <input type="text" name="company" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
                                 </div>
         
                                 <label htmlFor="password">Password</label>
                                 <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                 <label>Password can contain a-zA-Z, 0-9 and this symbols 👉 '@$&_!'. Password length should be at least 8 or more</label>
         
                                 {!isLoading && <button className="btn-square t-mar-25" onClick={(e) => {setIsLoading(true); HandleSubmit(e)}}>Sign Up</button>}
                                 {isLoading && 
                                 <button className="btn-square-loading t-mar-25" disabled>
                                       <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>
                                 </button>}
                                 <p className="t-mar-15">Already have an account. <Link to="/login">Login</Link></p>
         
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

export default Register