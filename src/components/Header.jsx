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
          <div className='mobileTaskbar'>
            <button className="userButton" onClick={()=>setMobileNav("profile")}>Profile</button>
            <button className="userButton" onClick={()=>setMobileNav("nav")}><GiHamburgerMenu/></button>
          </div>
        </div>
        {mobileNav &&
        (
          <>
            {mobileNav==="profile" && (
              <div className="sectionBlock">
                <ProfileArea username={username} profile={profile} updatePlans={updatePlans} updateInterests={updateInterests}/>
              </div>
            )}
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
 * @param {Object} props
 * @param {String} props.username - username for logged in user.
 * @param {Object} props.profile - profile information
 * @param {Function} props.updatePlans - function to update the plans after
 * graduation information
 * @param {Function} props.updateInterests - function to update the interests
 * information
 *
 * @returns {JSX.Element} The rendered profile area component.
 */
function ProfileArea( {username, profile, updatePlans, updateInterests}) {
  /* Render profile info dependent on whether it can be edited or not */
  let profileArea
  let editable, className;
  if (username === "Algor") {
    editable = true;
    className = "profileInfoEditable"
  } else {
    editable = false;
    className = "profileInfo"
  }

  profileArea = (
    <div className="headerInfo">
      <div>
        <h2 className="infoCaption"><SiGodotengine/> Interests </h2>
        <p className={className} contentEditable={editable} suppressContentEditableWarning onInput={updateInterests}>{profile.interests}</p>
      </div>
      <div>
        <h2 className="infoCaption"><HiAcademicCap/> Plans after graduation </h2>
        <p className={className} contentEditable={editable} suppressContentEditableWarning onInput={updatePlans}>{profile.plans}</p>
      </div>
    </div>
  )

  return (
    <>
      {profileArea}
    </>
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
      {username!=="" && (<ImageButton className="userButton" caption="Select" setFunc={updatePic} icon={(<AiOutlineUpload/>)}/>)}
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
        <a className={blogsStyle} onClick={() => setPage("blog")}><MdOutlineForum/>Blog</a>
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
 * @param {Object} props
 * @param {String} props.username - The name of the currently logged in user
 * @param {Function} props.setUsername - The function to call when the username
 * changes (used here for logging out)
 * @param {Function} props.setPage - Used to navigate to the login page
 * selected
 *
 * @returns {JSX.Element} The rendered userArea component
 */
function UserArea( {username, setUsername, setPage} ) {

  /**
   * Logs out the user.
   */
  const logout = () => {
    setUsername("");
    setPage("home");
  }

  if (username=='') {
    return (
      <div className="userArea">
        <button className="userButton" onClick={() => setPage("login")}><GrLogin /> Login</button>
        <p>Not logged in</p>
        <button className="userButton" onClick={()=>{document.documentElement.classList.toggle("light")}}><GrActions /> Mode</button>
      </div>
    );
  } else {
    return (
      <div className="userArea">
        <button className="userButton" onClick={logout}><GrLogout /> Logout</button>
        <p>Logged in as {username}</p>
        <button className="userButton" onClick={()=>{document.documentElement.classList.toggle("light")}}><GrActions /> Mode</button>
      </div>
    )
  }
}
