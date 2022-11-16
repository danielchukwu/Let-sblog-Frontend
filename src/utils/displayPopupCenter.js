export const displayPopupCenter = () => {
   const template = `
   <div className="pc-wrapper">
      <div className="pc-box-wrapper">
         <div className="pc-box">
            <p>Are you sure you want to delete this blog?</p>
            <div className="pc-options t-pad-15">
               <span>Cancel</span>
               <span>Confirm</span>
            </div>
         </div>
      </div>
      <div className="pc-bg">
      </div>
   </div>
   `;

   // Container for template
   const container = document.querySelector('.popup-center-container');

   // Add template
   container.innerHTML += template;
}
