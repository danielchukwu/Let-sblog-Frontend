import gsap from 'gsap'


const displayPopup = (invalid_input=null) => {
   // Messages
   let msg = ''
   if (invalid_input === 'password' || invalid_input === 'short') {
      msg = 'This password doesn\'t meet requirements!'
   } else if (invalid_input === 'username') {
      msg = 'This Username Is Already Taken!'
   } else if (invalid_input === 'invalid_username') {
      msg = 'This Username Is Invalid!'
   } else if (invalid_input === 'email'){
      msg = 'This Email Is Already Taken!'
   } else if (invalid_input === 'successful_update' ){
      msg = 'User Profile Successfully Updated! ✅'
   } else if (invalid_input === 'successful_registration' ){
      msg = 'Account Was Successfully Created! ✅'
   }
   // Template 
   const template = `
   <div class="pop-up-info">
      <div class="pp-card">
         <p style={'textAlign': 'center'}>${invalid_input? msg : 'Invalid Username and Password!'}</p>
      </div>
   </div>
   `;
   // Container for template
   const container = document.querySelector('.pop-up-container');
   // Add template
   container.innerHTML += template;
   // Animation
   gsap.from('.pop-up-info', {top: '-100px', duration: 0.3, opacity: 0.2});
   gsap.to  ('.pop-up-info', {top: '-200px', duration: 0.2, opacity: 0.2, delay: 3});
   // Remove template in 3 seconds
   setTimeout(() => {
      container.innerHTML = '';
   }, 3500)
}

export default displayPopup;