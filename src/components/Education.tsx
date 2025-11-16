import fullMarks from "../assets/marks.json";
import "./Bodies.css";

/* Icon imports */
import { HiAcademicCap } from "react-icons/hi2";
import { FaUniversity } from "react-icons/fa";
import { BiSolidBusSchool } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { FaPython } from "react-icons/fa";
import { TbMathIntegralX } from "react-icons/tb";
import { FaDice } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { PiVectorTwoFill } from "react-icons/pi";
import { MdOutlineScience } from "react-icons/md";
import { FaJava } from "react-icons/fa";
import { TbMatrix } from "react-icons/tb";
import {
  SiNeovim,
  SiJupyter,
  SiDelphi,
  SiRstudioide,
  SiTypescript,
} from "react-icons/si";
import { MdCellWifi } from "react-icons/md";
import { TiFlowParallel } from "react-icons/ti";
import { AiFillOpenAI } from "react-icons/ai";
import { PiGraphBold } from "react-icons/pi";
import { FaGitlab, FaCalculator, FaHeart } from "react-icons/fa6";
import { BsRegex } from "react-icons/bs";
import { PiWaveSine } from "react-icons/pi";
import { FaPenAlt } from "react-icons/fa";
import { GiAfrica } from "react-icons/gi";
import { FaDna } from "react-icons/fa6";
import { FaFileDownload } from "react-icons/fa";

/* Icon map for marks */
const componentMap = {
  CS1: FaPython,
  M: TbMathIntegralX,
  PTS: FaDice,
  PHY: FaBalanceScale,
  DS1: SiRstudioide,
  AM1: PiVectorTwoFill,
  SIC: MdOutlineScience,
  DSA: FaJava,
  MS: ImStatsDots,
  AM2: TbMatrix,
  CA: SiNeovim,
  DS2: SiJupyter,
  NET: MdCellWifi,
  CONC: TiFlowParallel,
  ML: AiFillOpenAI,
  AMD: PiGraphBold,
  WEB: SiTypescript,
  SE: FaGitlab,
  AUTO: BsRegex,
  FOU: PiWaveSine,
  ENG: FaPenAlt,
  AFR: GiAfrica,
  PRE: FaCalculator,
  LO: FaHeart,
  IT: SiDelphi,
  BIO: FaDna,
};

/* Marks type */
type Marks = {
  id: number;
  name: string;
  mark: string;
  icon: string;
};

/**
 * The Education component
 */
export default function Education() {
  return (
    <>
      <h2 className="sectionHeading">
        Education <HiAcademicCap />
      </h2>
      <h3 className="sectionSubHeading">
        University <FaUniversity />
      </h3>
      <div className="sectionBlock">
        <h4 className="sectionBlockHeading">University Experience</h4>
        <p>
          I am attending Stellenbosch University and am currently studying the
          third year of my BSc Computer Science degree. Here, I have learned
          many skills that can be viewed on the Skills/Experience section of the
          website. Below I list the modules that I have done during the course,
          and their respective marks.{" "}
        </p>
        <p>
          During my studies, I was awarded a full cost scholarship by Investec
          Bank for my high academic achievement, allowing me to continue my
          studies from my second year onwards. After finishing my honours year,
          I will also be working for them.
        </p>
      </div>
      <UniMarksPanel
        year={"3"}
        marks1={fullMarks.year3sem1}
        marks2={fullMarks.year3sem2}
      />
      <UniMarksPanel
        year={"2"}
        marks1={fullMarks.year2sem1}
        marks2={fullMarks.year2sem2}
      />
      <UniMarksPanel
        year={"1"}
        marks1={fullMarks.year1sem1}
        marks2={fullMarks.year1sem2}
      />
      <h3 className="sectionSubHeading">
        High School <BiSolidBusSchool />
      </h3>
      <div className="sectionBlock">
        <h4 className="sectionBlockHeading">School Experience</h4>
        <p>
          I attended Fairmont High School, where I was first exposed to software
          development through Information Technology. From then, I always knew I
          was going to study software engineering.
        </p>
        <p>
          I came 7th place in my school for my matric result with an average of
          88,4%. I was awarded academic honours in Gr 12 and 11, and academic
          colours in Gr 10. My marks are shown below.
        </p>
      </div>
      <a className="outerButton" href="./NSC.pdf" download="NSC-Dylan-Reid">
        <h2>
          <FaFileDownload />
        </h2>
        <h2> Download my NSC </h2>
      </a>
      <NscMarks marks={fullMarks.NSC} />
    </>
  );
}

/** types for the Uni marks panel */
type UniMarksPanelProps = {
  year: string;
  marks1: Marks[];
  marks2: Marks[];
};

/**
 * A panel for university marks
 */
function UniMarksPanel({ year, marks1, marks2 }: UniMarksPanelProps) {
  return (
    <div className="sectionBlock">
      <h3 className="sectionBlockHeading"> Year {year}</h3>
      <div className="semesterGroup">
        <SemesterMarksPanel number={"1"} marks={marks1} />
        <SemesterMarksPanel number={"2"} marks={marks2} />
      </div>
    </div>
  );
}

/** Props for university semester marks */
type SemesterMarksPanelProps = {
  number: string;
  marks: Marks[];
};

/**
 * A panel for university semester marks
 */
function SemesterMarksPanel({ number, marks }: SemesterMarksPanelProps) {
  return (
    <div className="semester">
      <h4>Semester {number}</h4>
      <MarksMap marks={marks} />
    </div>
  );
}

/**
 * A panel for school marks
 */
function NscMarks({ marks }: MarksMapProps) {
  return (
    <div className="sectionBlock">
      <h3 className="sectionBlockHeading">NSC Final Marks</h3>
      <div className="semester">
        <MarksMap marks={marks} />
      </div>
    </div>
  );
}

/** Props for marks */
type MarksMapProps = {
  marks: Marks[];
};

/**
 * An individual marks list
 */
function MarksMap({ marks }: MarksMapProps) {
  return (
    <ul>
      {marks.map((mark) => {
        const Icon = componentMap[mark.icon];
        return (
          <li
            key={mark.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              {Icon && <Icon />} &nbsp; {mark.name}
            </span>
            <span>({mark.mark})</span>
          </li>
        );
      })}
    </ul>
  );
}
