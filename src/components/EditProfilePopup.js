import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants';


export const EditProfilePopup = ({ setShowEditPopup, owner }) => {
   const [occupation, setOccupation] = useState();
   const [email, setEmail] = useState();
   const [skills, setSkills] = useState();
   const [isLoading, setIsLoading] = useState();
   const {spinnerStyle} = useConstants();
   const HandleSubmit = () => {

   }
   return (
      <>
         <div className="pc-wrapper">
            
            {/* Dark Background */}
            <div className="pc-bg z-index-1" onClick={() => setShowEditPopup(false)}></div>
            {/* <div className="pc-bg z-index-1"></div> */}

            {/* popup Content */}
            <div className='edit-box'>
               <div className='eb-wrapper'>
                  <div className='eb-title'>
                     <h3 className='fs-20'>Update Profile</h3>
                     <span className='up-cancel' onClick={() => setShowEditPopup(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                           <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                        </svg>
                     </span>
                  </div>
                  <div className='eb-body traditional-input'>
                     <div className='eb-1'>
                        <div className="grid-input-2">
                           <label htmlFor="name">Occupation</label>
                           <label htmlFor="email">Work Place</label>
                           
                           <input type="text" name="name" id="name" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
                           <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className='eb-skills t-pad-20'>
                           <label htmlFor="username">Skills</label>
                           <input type="text" name="username" id="username" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                        </div>

                        <div className='ebs t-pad-10'>
                           <span>Python 
                              <small className='remove-skill'>
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                                 </svg>
                              </small>
                           </span>
                        </div>

                     </div>
                     
                     
                     <div className="flex-right">
                        {!isLoading && <button className="btn-square t-mar-10" onClick={(e) => {setIsLoading(true); HandleSubmit(e)}}>Save</button>}
                        {isLoading && 
                        <button className="btn-square-loading t-mar-10" disabled>
                              <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>
                        </button>}
                     </div>
                  </div>
               </div>
            </div>
            
         </div>
      </>
   )
}
