import navItems from "../models/NavItem";
import DisplaySvg from "./images/DisplaySvg";


const FooterMain = () => {   
   return (
      <>
         {/* Desktop */}
         <footer className="footer-desktop t-pad-100">
            <div className="footer-wrapper">
               <div className="owner-container tb-pad-40 max-w-1000">
                  <h3 className="who">Made by Chukwu Daniel 😁</h3>
               </div>
            </div>
         </footer>

         {/* Mobile */}
         <footer className="footer-mobile t-pad-100">
            <div className="footer-m-wrapper">
               <div className="footer-m-content">
                  {navItems.map(navItem => {
                     return <DisplaySvg svg={navItem.iconSrc} selector={"navbar-svg_selected"} />
                  })}
               </div>
            </div>
         </footer>
      </>
   )
}

export default FooterMain;