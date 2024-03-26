import React, { useState } from "react";
import Icon from "./Images/headhunter48.png";
import Profile from "./Images/profile.png";
import Dashboard from "./Images/dashboard.svg";
import Transactions from "./Images/transactions.svg";
import Performance from "./Images/performance.svg";
import News from "./Images/news.svg";
import Settings from "./Images/settings.svg";
import Support from "./Images/support.svg";
import { useLocation } from "react-router-dom";

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
    toggleSidebar();
  };

  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div
        className={
          closeMenu === false ? "logoContainer" : "logoContainer active"
        }
      >
        <img src={Icon} alt="icon" className="logo" />
        <h2 className="title">Headhunter </h2>
      </div>
      <div
        className={
          closeMenu === false ? "burgerContainer" : "burgerContainer active"
        }
      >
        <div
          className="burgerTrigger"
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className="burgerMenu"></div>
      </div>
      <div
        className={
          closeMenu === false ? "profileContainer" : "profileContainer active"
        }
      >
        <img src={Profile} alt="profile" className="profile" />
        <div className="profileContents">
          <p className="name">Hello, Mikael</p>
          <p>mikael.engvall.me@gmail.com</p>
        </div>
      </div>
      <div
        className={
          closeMenu === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <img src={Dashboard} alt="dashboard" />
            <a href="/">dashboard</a>
          </li>
          <li className={location.pathname === "/ads" ? "active" : ""}>
            <img src={Transactions} alt="ads" />
            <a href="/ads">ads</a>
          </li>
          <li className={location.pathname === "/performance" ? "active" : ""}>
            <img src={Performance} alt="Performance" />
            <a href="/performance">performance</a>
          </li>
          <li className={location.pathname === "/htmlpages" ? "active" : ""}>
            <img src={News} alt="HTMLpages" />
            <a href="/htmlpages">Html pages</a>
          </li>
          <li className={location.pathname === "/settings" ? "active" : ""}>
            <img src={Settings} alt="Settings" />
            <a href="/settings">settings</a>
          </li>
          <li className={location.pathname === "/support" ? "active" : ""}>
            <img src={Support} alt="Support" />
            <a href="/support">support</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
