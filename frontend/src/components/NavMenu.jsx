import React from 'react';
import HomePage from '../pages/HomePage';

const NavMenu = () => {
  return (
    <div className="header-nav">
      <nav className="nav-main-menu d-none d-xl-block">
        <ul className="main-menu">
          <li className="has-children">
            <a className="active" href={<HomePage />}>Home</a>
          </li>
          {/* Repeat this pattern for other menu items */}
        </ul>
      </nav>
      <div className="burger-icon burger-icon-white">
        <span className="burger-icon-top"></span>
        <span className="burger-icon-mid"></span>
        <span className="burger-icon-bottom"></span>
      </div>
    </div>
  );
};

export default NavMenu;
