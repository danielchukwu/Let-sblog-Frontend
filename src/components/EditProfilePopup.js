import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants';
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import displayPopup from '../utils/displayPopup';


export const EditProfilePopup = ({ setShowEditPopup, owner }) => {
   const {host_url} = useUrl();
   const [isLoading, setIsLoading] = useState();
   const {spinnerStyle} = useConstants();

   // Form state
   const [occupation, setOccupation] = useState();
   const [company, setCompany] = useState();
   const [skillsList, setSkillsList] = useState();
   const [skill, setSkill] = useState();

   // Initiate States for our input fields
   useEffect(() => {
      setOccupation(owner.occupation);
      setCompany(owner.company);
      setSkillsList(owner.skills);
   }, [])

   // Add Skill
   const handleAddSkills = (e) => {
      e.preventDefault();
      // Don't add skill if skill has already been added
      for (let i = 0; i < skillsList.length; i++) {
         if (skillsList[i] === skill.toLowerCase()){
            setSkill('');
            return;
         }
      }

      const newData = skillsList;
      newData.push(skill.toLowerCase());
      setSkill('');
      setSkillsList([...newData]);
   }

   // Remove Skill
   const handleRemoveSkill = (skill) => {
      let newData = skillsList;
      newData = newData.filter(sk => sk !== skill);
      setSkillsList([...newData]);
   }
   
   
   const HandleSubmit = (e) => {
      e.preventDefault();

      const body = {};
      // Changed fields 
      if (owner.company !== company){ body['company'] = company; }
      if (owner.occupation !== occupation) { body['company'] = company; }
      body['skills'] = skillsList;

      // add removed fields
      const removed_skills = [];
      for (let i = 0; i < owner.skills.length; i++) {
         if (!skillsList.includes(owner.skills[i])){
            removed_skills.push(owner.skills[i]);
         }
      }
      body['removed_skills'] = removed_skills;

      // Send Post Request
      fetch(`${host_url}/users/update`, {
         method: 'PUT',
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
         setIsLoading(false)
         displayPopup("Profile was Updated Successfully ✅")
      })
      .catch((err) => {
         setIsLoading(false)
         displayPopup("Something went wrong!")
      })
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
                  <div className='eb-body rl-fields traditional-input'>
                     <div className='eb-1'>
                        <div className="grid-input-2">
                           <label htmlFor="occupation">Occupation</label>
                           <label htmlFor="company">Work Place</label>
                           
                           <input type="text" name="occupation" id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
                           <input type="text" name="company" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
                        </div>

                        <form onSubmit={(e) => handleAddSkills(e)}>
                           <div className='eb-skills'>
                              <label htmlFor="username">Skills</label>
                              <input type="text" name="skill" id="skill" value={skill} onChange={(e) => setSkill(e.target.value)} required />
                           </div>
                        </form>

                        <div className='ebs t-pad-10' >
                        {skillsList && 
                        skillsList.map((skill) => {
                           return(
                              <span key={skill} onClick={() => handleRemoveSkill(skill)} >{skill}
                                 <small className='remove-skill'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                       <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                    </svg>
                                 </small>
                              </span>
                           )
                        })
                        }
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
