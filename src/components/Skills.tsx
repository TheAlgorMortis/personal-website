import { useState } from "react";
import skills from "../assets/skills.json";
import "./Bodies.css";
import { useParams, useNavigate } from "react-router-dom";

/* icon import for skills */
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import {
  SiNeovim,
  SiJupyter,
  SiDelphi,
  SiRstudioide,
  SiTypescript,
} from "react-icons/si";
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
  PYTHON: FaPython,
  JAVA: FaJava,
  TS: SiTypescript,
  GODOT: SiGodotengine,
  C: RiTerminalBoxFill,
  GIT: FaGitAlt,
  TEAMWORK: RiTeamFill,
  ADAPT: FaArrowRight,
  CT: GiBrain,
  INCL: FaHandshake,
  RESOURCE: GrResources,
  LEADERSHIP: GiCaptainHatProfile,
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
  SNAKE: VscSnake,
};

/* Map for heading for skill and experience categories, primarily because I
 * didn't factor it into the json file */
const catMap = {
  technical: "Technical Skills",
  soft: "Soft Skills",
  "personal-tech-experience": "Personal Tech Experience",
  "university-projects": "University Projects",
  "non-tech-endeavors": "Non-tech Endeavors",
  "leadership-roles": "Leadership Roles",
};

/************************
 * Setting up skill types
 ***********************/

/**
 * Skills as displayed on the Skills and Experience page.
 */
type SkillItem = {
  name: string;
  id?: string;
  icon?: string;
  timeframe?: string;
  brief?: string;
  points?: Point[];
};

/* Point type in a skill (can be Link, text, or Image) */
type Point = PointLink | PointText | PointImage;

/* Link point in a skill */
type PointLink = {
  name: string;
  link: string;
  icon?: string;
};

/* Text point in a Skill */
type PointText = {
  text: string;
};

/** Image point in a Skill */
type PointImage = {
  src: string;
  caption?: string;
};

/* Check if p is a PointLink */
function isPointLink(p: Point): p is PointLink {
  return "link" in p;
}
/* Check if p is a PointText */
function isPointText(p: Point): p is PointText {
  return "text" in p;
}
/* Cehck if p is a PointImage */
function isPointImage(p: Point): p is PointImage {
  return "src" in p;
}

/*********************************
 * Setting up React Router things
 ********************************/

type Params = { category?: string; detail?: string };

/**********************************
 * Over-arching skills component
 *********************************/

/**
 * The skills component
 */
export default function Skills() {
  // Category and detail, if any.
  const { category, detail } = useParams<Params>();

  // Determine which tab we're in based on the URL
  const tab = location.pathname.includes("/experience")
    ? "experience"
    : "skills";

  // Navigate
  const navigate = useNavigate();

  /**
   * Control bar that displays whether you're currently on skills and
   * experience, and gives you a button to switch between the two.
   *
   * @param tab The current tab type (experience or skill)
   */
  const getControlBar = (tab: string) => {
    //
    if (tab == "experience") {
      return (
        <div>
          <h2 className="sectionHeading"> Experience </h2>
          <button
            className="outerButton"
            onClick={() => navigate("/skills/skills/technical")}
          >
            Switch to Skills
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="sectionHeading"> Skills </h2>
          <button
            className="outerButton"
            onClick={() =>
              navigate("/skills/experience/personal-tech-experience")
            }
          >
            Switch to Experience
          </button>
        </div>
      );
    }
  };

  /**
   * Get the categories depending on the tab and display buttons to switch
   * between them
   *
   * @param tab Skills or Experience tab
   * @param category Category within the tab
   */
  const getCategories = (tab: "skills" | "experience") => {
    return (
      <div className="flexRow">
        {Object.keys(skills[tab] ?? {}).map((cat: string) => (
          <button
            className="outerButton"
            onClick={() => navigate(`/skills/${tab}/${cat}`)}
          >
            {catMap[cat]}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* control bar */}
      {getControlBar(tab)}
      {/* category select */}
      <div className="sectionBlock">
        {getCategories(tab)}
        {category && tab && (
          <>
            {detail &&
              skills[tab][category].map((entry: SkillItem) => {
                if (detail === entry.id) {
                  return (
                    <Se
                      tab={tab}
                      category={category}
                      skill={entry}
                      expanded={detail === entry.id}
                    />
                  );
                }
              })}
            <h3 className="sectionSubHeading">{catMap[category]}</h3>
            <div className="skillSet">
              {skills[tab][category].map((entry: SkillItem) => {
                if (entry.id !== detail) {
                  return <Se tab={tab} category={category} skill={entry} />;
                }
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/*******************************************
 * Skills and Experience previews and infos
 ******************************************/

type SeProps = {
  tab: string;
  category: string;
  skill: SkillItem;
  expanded: boolean;
};

/*
 * A skill preview
 */
function Se({ tab, category, skill, expanded }: SeProps) {
  const Icon =
    "icon" in skill
      ? componentMap[skill.icon as keyof typeof componentMap]
      : null;
  const hasPoints = "points" in skill;
  const navigate = useNavigate();

  return (
    <div className="skillBlock">
      <h3 className="flexRow">
        {Icon && <Icon />}
        {skill.name}
      </h3>
      {skill.timeframe == "" || <h4>{skill.timeframe}</h4>}
      {skill.brief && <p className="sectionBlock">{skill.brief}</p>}
      {hasPoints && !expanded && (
        <button
          className="outerButton"
          onClick={() => navigate(`/skills/${tab}/${category}/${skill.id}`)}
        >
          More
        </button>
      )}
      {expanded && (
        <div>
          {/** Points from the SE*/}
          {(skill.points ?? []).map((point, idx) => {
            if (isPointText(point))
              return <SeText key={`t-${idx}`} pointText={point} />;
            if (isPointLink(point))
              return <SeLink key={`l-${idx}`} pointLink={point} />;
            /* if (isPointImage(point)) */
            /*   return <SeImage key={`i-${idx}`} pointImage={point} />; */
            return null;
          })}
          {/** Button to navigate back */}
          <button
            className="outerButton"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Text Point Props
 */
type SeTextProps = {
  pointText: PointText;
};

/**
 * Text Point
 */
function SeText({ pointText }: SeTextProps) {
  return (
    <div className="sectionBlock">
      <p> {pointText.text} </p>
    </div>
  );
}

/**
 * Link Point
 */
type SeLinkProps = {
  pointLink: PointLink;
};

/**
 * Link Point
 */
function SeLink({ pointLink }: SeLinkProps) {
  const caption = pointLink.name || pointLink.link;
  const Icon =
    "icon" in pointLink
      ? componentMap[pointLink.icon as keyof typeof componentMap]
      : null;
  return (
    <div className="sectionBlock">
      {Icon && <Icon />}
      <a href={pointLink.link}>{caption}</a>
    </div>
  );
}
