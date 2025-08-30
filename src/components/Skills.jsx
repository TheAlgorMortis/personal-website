import { useState } from 'react'
import skills from '../assets/skills.json';
import './Bodies.css'

/* icon import for skills */
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { SiNeovim, SiJupyter, SiDelphi, SiRstudioide, SiTypescript } from "react-icons/si";
import { SiGodotengine } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { GiCaptainHatProfile } from "react-icons/gi";
import { FaPiggyBank } from "react-icons/fa6";
import { FaTaxi } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { MdMovieCreation } from "react-icons/md";
import { BiSolidChess } from "react-icons/bi";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa6";
import { FaRecycle } from "react-icons/fa";
import { RiTerminalBoxFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { SiAseprite } from "react-icons/si";
import { FaVideo } from "react-icons/fa";
import { VscSnake } from "react-icons/vsc";

/* Icon map for skills */
const componentMap = {
  PYTHON:FaPython,
  JAVA:FaJava,
  TS:SiTypescript,
  GODOT:SiGodotengine,
  C:RiTerminalBoxFill,
  GIT:FaGitAlt,
  TEAMWORK:RiTeamFill,
  ADAPT:FaArrowRight,
  CT:GiBrain,
  INCL:FaHandshake,
  RESOURCE:GrResources,
  LEADERSHIP:GiCaptainHatProfile,
  INVEST: FaPiggyBank,
  TAXI: FaTaxi,
  BOOK: FaBook,
  MOVIE: MdMovieCreation,
  BOARD: BiSolidChess,
  JUPYTER: SiJupyter,
  WILDLIFE: FaEarthAfrica,
  MEDIA: FaNewspaper,
  ART: FaRecycle,
  TM: FaClock,
  PIX: SiAseprite,
  MOV: FaVideo,
  SNAKE: VscSnake
};


/**
 * The skills component
 *
 * @component
 *
 * @param {Object} props
 * @returns {JSX.Element} The rendered skills component.
 */
export default function Skills() {
  return (
    <>
      <h1 className="sectionHeading">Skills / Experience</h1>
        {Object.entries(skills).map(([type, info]) => (<Sections key={type} sectionName={type} sectionInfo={info} />))}
    </>
  )
}

/*
 * A section component
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.sectionName - the name of the section
 * @param {Object} props.sectionInfo - the info for the section
 *
 * @returns {JSX.Element} The rendered component.
 */
function Sections( {sectionName, sectionInfo} ) {
  return (
    <div>
      <h2 className="sectionSubHeading">{sectionName}</h2>
      {Object.entries(sectionInfo).map(([section, skills]) => (<SectionList key={section} name={section} skills={skills} />))}
    </div>
  )
}

/*
 * A section component's list
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.name - the name of the List
 * @param {Object} props.items - the items in the list
 *
 * @returns {JSX.Element} The rendered component.
 */
function SectionList( {name, skills} ) {
  return (
    <div className="sectionBlock">
      <h3 className="sectionBlockHeading">{name}</h3>
      <div className="skillSet">
        {skills.map(skill => (<SkillBlock key={skill.item} skill={skill}/>))}
      </div>
    </div>
  )
}

/*
 * A skill block
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.skill - The skill object to draw the information from.
 *
 * @returns {JSX.Element} The rendered component.
 */
function SkillBlock ( {skill} ) {
  const hasBody = skill.body !== "" || skill.link !== "";
  const Icon = componentMap[skill.icon];

  return (
    <div className="skillBlock">
       <h3 className="flexRow">{Icon && <Icon/>}{skill.item}</h3>
      {skill.timeframe=="" || (<h4>{skill.timeframe}</h4>)}
      {skill.body && (<p className="sectionBlock">{skill.body}</p>)}
      {skill.linkCaption && (<a className="outerButton" href={skill.link} target="_blank" rel="noopener noreferrer">{skill.linkCaption}</a>)} </div>) }
