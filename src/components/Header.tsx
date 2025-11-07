import { useState } from "react";
import profilePic from "../assets/profile.jpeg";
import { useMatch, useNavigate } from "react-router-dom";

/* icons */
import { GrActions } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi2";
import { LuKeyboard } from "react-icons/lu";
import { SiGodotengine } from "react-icons/si";
import { IoIosHome } from "react-icons/io";
import { FaFileDownload, FaGithub, FaBook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";

/* Components */
import "./Header.css";
import "./Bodies.css";

/**
 * The header for the website
 */
export default function Header() {
  const [mobileNav, setMobileNav] = useState("");

  return (
    <header className="header">
      <div className="desktopHeader">
        <ProfilePic />
        <ProfileArea />
        <NavArea />
        <UserArea />
      </div>
      <div className="mobileHeader">
        <div className="mobileTaskbar">
          <ProfilePic />
          <ProfileArea />
          <div className="mobileTaskbar">
            <button className="burger" onClick={() => setMobileNav("nav")}>
              <h1>
                <GiHamburgerMenu />
              </h1>
            </button>
          </div>
        </div>
        {mobileNav && (
          <>
            {mobileNav === "nav" && (
              <div className="mobileNavBlock">
                <NavArea />
                <UserArea />
              </div>
            )}
            <button
              onClick={() => {
                setMobileNav("");
              }}
              className="outerButton"
            >
              <h2>Close</h2>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

/**
 * component showing profile information
 *
 * @component
 */
function ProfileArea() {
  return (
    <div className="headerInfo">
      <h1 className="infoCaption">Dylan James Reid </h1>
      <h3 className="infoCaptionSub">
        {" "}
        <FaCode />
        Software Engineer
      </h3>
      <h3 className="infoCaptionSub">
        {" "}
        <SiGodotengine />
        Game Developer
      </h3>
      <h3 className="infoCaptionSub">
        {" "}
        <FaKeyboard />
        Creative Writer{" "}
      </h3>
    </div>
  );
}

/**
 * component showing profile picture
 */
function ProfilePic() {
  return (
    <div className="userArea">
      <img src={profilePic} className="profilePic" />
    </div>
  );
}

/**
 * The navigation area for the header
 */
function NavArea() {
  const navigate = useNavigate();
  /* Decide on styles for navigation */
  const isHome = !!useMatch("/home");
  const isEducation = !!useMatch("/education");
  const isSkills = !!useMatch("/skills");

  const homeStyle = isHome ? "navSelected" : "navButton";
  const educationStyle = isEducation ? "navSelected" : "navButton";
  const skillsStyle = isSkills ? "navSelected" : "navButton";

  /* Return the react component */
  return (
    <div className="navGroup">
      <nav className="nav">
        <a className={homeStyle} onClick={() => navigate("/home")}>
          <IoIosHome /> Home
        </a>
        <a className={educationStyle} onClick={() => navigate("/education")}>
          <HiAcademicCap /> Education
        </a>
        <a className={skillsStyle} onClick={() => navigate("/skills")}>
          <LuKeyboard /> Skills/Experience
        </a>
      </nav>
      <nav className="nav">
        <a className="navLink" href="./CV.pdf" download="CV-Dylan-Reid">
          <FaFileDownload />
          CV
        </a>
        <a
          className="navLink"
          href="https://github.com/TheAlgorMortis"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Github
        </a>
        <a
          className="navLink"
          href="https://www.linkedin.com/in/dylan-james-reid/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          Linkedin
        </a>
        <a
          className="navLink"
          href="https://ddylanrreid.wixsite.com/my-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaBook />
          My Writing
        </a>
      </nav>
    </div>
  );
}

/**
 * The user area of the header. It allows for logging in and out and toggling
 * dark mode.
 */
function UserArea() {
  return (
    <div className="userArea">
      <button
        className="userButton"
        onClick={() => {
          document.documentElement.classList.toggle("light");
        }}
      >
        <GrActions /> Mode
      </button>
    </div>
  );
}
