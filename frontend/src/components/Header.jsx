// Header.js
import React from "react";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className="header sticky-bar">
      <div className="container">
        <div className="main-header">
          {/* <div className="header-left"> */}
            <div className="header-logo">
            </div>
            <HeaderNav />
          </div>
        </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
