import './Bodies.css'
import { TiWorld } from "react-icons/ti";
import { MdDarkMode } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { IoIosPhonePortrait } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { SiGodotengine } from "react-icons/si";
import { HiAcademicCap } from "react-icons/hi2";

/**
 * The home component for the Dylan Reid Personal website.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Home() {
  return (
    <>
      <h1 className="sectionHeading">Welcome to Dylan Reid's Personal Website!<RiRobot3Fill/></h1>
        <div className="sectionBlock">
          <h2 className="sectionBlockHeading">Who Am I?<FaRegUser/></h2>
          <p>I am a passionate creator, whether it be through developing software, writing novels, or producing video games. I am constantly learning new skills, which I intend to use with my out-of-the-box thinking to solve real world problems. I strive to create media and tools that will aid or entertain others. I am enthusiastic, buoyant, and optimistic, with relentless determination and ambition. I am reliable and responsible, and I care deeply about others. I aim to work towards a green and progressive future. </p>
        </div>
        <div className="sectionBlock">
          <h2 className="sectionBlockHeading">Plans After Graduation<HiAcademicCap/></h2>
          <p>
            After finishing my undergraduate degree, I will be studying my honours in Computer Science. After that, I will be working as a Software Engineer at Investec Bank.
          </p>
        </div>
      <h1 className="sectionHeading">Navigating The Site</h1>
        <div className="sectionBlock">
          <h2 className="sectionBlockHeading">Explore My World<TiWorld/></h2>
          <p>Use the navigation tab above to check my Education and Skills/Experience. You can also visit the blog page to hear my thoughts on things.</p>
        </div>
        <div className="sectionBlock">
          <h2 className="sectionBlockHeading">Dark Mode<MdDarkMode/></h2>
          <p> You can toggle between light and dark mode using the Mode button in the header button above. Dylan recommends always using darkmode as it's better for your eyes and more energy efficient. It also looks better. For that reason, it is the default on this site.</p>
        </div>
        <div className="sectionBlock">
          <h2 className="sectionBlockHeading">Responsive Design<IoIosPhonePortrait/></h2>
          <p> This website was designed to look good on any device, meaning you can view it on a computer, phone, tablet, or even a smart-toaster, if you have one with a screen.</p>
        </div>
    </>
  )
}
