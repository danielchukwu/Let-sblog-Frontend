import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants';
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import displayPopup from '../utils/displayPopup';


// This popup only updates users
// - occupation
// - company
// - skills

export const EditProfilePopup = ({ setShowEditPopup, owner, setOwner }) => {
   const {host_url} = useUrl();
   const [isLoading, setIsLoading] = useState();
   const {spinnerStyle} = useConstants();

   // Form state
   const [occupation, setOccupation] = useState();
   const [company, setCompany] = useState();
   const [skillsList, setSkillsList] = useState();

   // Skill Input field
   const [skill, setSkill] = useState();

   const [originalSkillList, setOriginalSkillList] = useState();


   // Initiate States for our input fields
   useEffect(() => {
      setOccupation(owner.occupation);
      setCompany(owner.company);
      setSkillsList(owner.skills);
      setOriginalSkillList([...owner.skills]);
   }, [])

   // Add Skill
   const handleAddSkills = (e) => {
      e.preventDefault();
      // Don't add skill if skill has already been added
      if (skillsList.includes( skill.toLowerCase() )){
         setSkill('');
         return;
      }

      // Add skill to skillList
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
      if (owner.occupation !== occupation) { body['occupation'] = occupation; }

      // add new skills only
      body['skills'] = [];
      skillsList.map(sk => {
         if (!originalSkillList.includes(sk)){
            body['skills'].push(sk);
         }
      })
      
      // add removed fields
      body['removed_skills'] = [];
      originalSkillList.map(sk => {
         if (!skillsList.includes(sk)){
            body['removed_skills'].push(sk);
         }
      })

      function updateOwnerState () {
         const newData = owner;
         if (body.company) {newData.company = body.company; }
         if (body.occupation) {newData.occupation = body.occupation; }
         newData.skills = [...skillsList];

         console.log("update Owner State")
         console.log(setOwner)
         setOwner({...newData})
      }
      
      // console.log(originalSkillList)
      // console.log(skillsList)
      // console.log(body)

      // if there is no changes or update then
      // don't send a request to the backend
      if (body.skills.length === 0 && body.removed_skills.length === 0 && body.company === undefined && body.occupation === undefined){
         console.log('No Changes');
         setIsLoading(false)
         displayPopup('There were no changes found!');
         return;
      }

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
         updateOwnerState();

         setTimeout(() => {
            setShowEditPopup(false);
         }, 3000)
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
