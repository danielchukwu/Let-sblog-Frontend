import { useNavigate } from "react-router-dom";
import NavItems from "../models/NavItem";
import DisplaySvg from "./images/DisplaySvg";

const FooterMain = () => {
  const navigate = useNavigate();

  const handleClick = (route, index) => {
    // Update to new selected navbar
    NavItems.setSelectedIndex(index);
    navigate(route);
  }

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
            {NavItems.items.map((navItem, index) => {
              return (
                <div key={index} onClick={() => handleClick(navItem.route, index)}>
                  <DisplaySvg
                  svg={navItem.iconSrc}
                  selector={
                    index == NavItems.selectedIndex
                      ? "navbar-svg-selected"
                      : "navbar-svg"
                  }
                />
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterMain;
