import { useState } from 'react';
import rawProfilePic from '../assets/profile.jpeg';
import rawProfile from '../assets/profile.json';

/* icons */
import { GrActions, GrLogin, GrLogout } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi2";
import { MdOutlineForum } from "react-icons/md";
import { LuKeyboard } from "react-icons/lu";
import { SiGodotengine } from "react-icons/si";
import { IoIosHome } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";
import { FaFileDownload, FaGithub, FaBook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";

/* Components */
import ImageButton from './ImageButton.jsx';
import './Header.css';
import './Bodies.css';

/**
 * The header for the website
 *
 * @component
 *
 * @param {Object} props
 * @param {Function} props.setPage - indexer for navigation.
 * @param {String} props.username - username of the user, if logged in.
 * @param {Function} props.setUsername - function to call on the parent when the
 * username is set.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header( {page, setPage, username, setUsername}) {
  /** Import profile picture and profile information, or load it from local storage if it exists */
  let profile = {...rawProfile};
  const storedProfile = localStorage.getItem("profile");
  if (storedProfile) {
    profile = JSON.parse(storedProfile);
  }

  const storedPic = localStorage.getItem("profilePic");
  const [profilePic, setProfilePic] = useState(storedPic || rawProfilePic)
  const [mobileNav, setMobileNav] = useState("");

  /**
   * Called when the interests section is modified to save the new text.
   * @param {React.FormEvent<HTMLElement>} event - the event from which to derive the text
   */
  const updateInterests = (event) => {
    profile.interests = event.target.innerText;
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  /**
   * Called when the plans section is modified to save the new text.
   * @param {React.FormEvent<HTMLElement>} event - the event from which to derive the text
   */
  const updatePlans = (event) => {
    profile.plans = event.target.innerText;
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  /**
   * Called when the profile picture is updated
   * @param {String} pic - data URL for the new picture
   */
  const updatePic = (pic) => {
    setProfilePic(pic)
    localStorage.setItem("profilePic", pic);
  }

  const mobileSetPage = (page) => {
    setPage(page);
    setMobileNav("");
  }

  return (
    <header className="header">
      <div className="desktopHeader">
        <ProfilePic username={username} profilePic={profilePic} updatePic={updatePic}/>
        <ProfileArea username={username} profile={profile} updatePlans={updatePlans} updateInterests={updateInterests}/>
        <NavArea page={page} setPage={setPage} />
        <UserArea username={username} setUsername={setUsername} setPage={setPage}/>
      </div>
      <div className="mobileHeader">
        <div className="mobileTaskbar">
          <ProfilePic username={username} profilePic={profilePic} updatePic={updatePic}/>
          <ProfileArea username={username} profile={profile} updatePlans={updatePlans} updateInterests={updateInterests}/>
          <div className='mobileTaskbar'>
            <button className="burger" onClick={()=>setMobileNav("nav")}><h1><GiHamburgerMenu/></h1></button>
          </div>
        </div>
        {mobileNav &&
        (
          <>
            {mobileNav==="nav" && (
              <div className="mobileNavBlock">
                <NavArea page={page} setPage={mobileSetPage} />
                <UserArea username={username} setUsername={setUsername} setPage={mobileSetPage}/>
              </div>
            )}
            <button onClick={()=>{setMobileNav("")}} className="outerButton"><h2>Close</h2></button>
          </>
        )}
      </div>
    </header>
  )
}

/**
 * component showing profile information
 *
 * @component
 *
 * @returns {JSX.Element} The rendered profile area component.
 */
function ProfileArea() {
  return (
    <div className="headerInfo">
      <h1 className="infoCaption">Dylan James Reid </h1>
      <h3 className="infoCaptionSub"> <FaCode/>Software Engineer</h3>
      <h3 className="infoCaptionSub"> <SiGodotengine/>Game Developer</h3>
      <h3 className="infoCaptionSub"> <FaKeyboard/>Creative Writer </h3>
    </div>
  )
}


/**
 * component showing profile picture
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.username - username for logged in user.
 * @param {String} props.profilePic - profile picture
 * @param {Function} props.updatePic - function to update the profile picture
 *
 * @returns {JSX.Element} The rendered profile picture component
 */
function ProfilePic( {username, profilePic, updatePic}) {
  const toUrl = (name) => new URL(name, import.meta.url).href;
  return (
    <div className="userArea">
      <img src={toUrl(profilePic)} className="profilePic"/>
    </div>
  )
}


/**
 * The navigation area for the header
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.page - The currently displayed page
 * @param {Function} props.setPage - The function to call when a new page is
 * selected
 *
 * @returns {JSX.Element} The rendered nav component
 */
function NavArea( {page, setPage}) {

  /* Decide on styles for navigation */
  const homeStyle = page === "home" ? "navSelected" : "navButton";
  const educationStyle = page === "education" ? "navSelected" : "navButton";
  const skillsStyle = page === "skills" ? "navSelected" : "navButton";
  const blogsStyle = page === "blog" ? "navSelected" : "navButton";

  /* Return the react component */
  return (
    <div className='navGroup'>
      <nav className='nav'>
        <a className={homeStyle} onClick={() => setPage("home")}><IoIosHome/> Home</a>
        <a className={educationStyle} onClick={() => setPage("education")}><HiAcademicCap /> Education</a>
        <a className={skillsStyle} onClick={() => setPage("skills")}><LuKeyboard/> Skills/Experience</a>
        {/*<a className={blogsStyle} onClick={() => setPage("blog")}><MdOutlineForum/>Blog</a> */}
      </nav>
      <nav className='nav'>
        <a className="navLink" href="../../public/CV.pdf" download="CV-Dylan-Reid"><FaFileDownload/>CV</a>
        <a className="navLink" href="https://github.com/TheAlgorMortis" target="_blank" rel="noopener noreferrer"><FaGithub/>Github</a>
        <a className="navLink" href="https://www.linkedin.com/in/dylan-james-reid/" target="_blank" rel="noopener noreferrer"><FaLinkedin/>Linkedin</a>
        <a className="navLink" href="https://ddylanrreid.wixsite.com/my-site" target="_blank" rel="noopener noreferrer"><FaBook/>My Writing</a>
      </nav>
    </div>
  )
}

/**
 * The user area of the header. It allows for logging in and out and toggling
 * dark mode.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered userArea component
 */
function UserArea() {
  return (
    <div className="userArea">
      <button className="userButton" onClick={()=>{document.documentElement.classList.toggle("light")}}><GrActions /> Mode</button>
    </div>
  )
}
