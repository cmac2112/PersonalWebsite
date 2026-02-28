import { useEffect } from "react";
import ObsidianViewer from "../../Components/ObsidianViewer/ObsidianViewer"
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import PogressionMeter from "../../Components/ProgressionMeter/PogressionMeter";
import "./MyProjects.css"
import type { Section } from '../../Helpers/Section'; 
import Intrust from './RenderContent/Intrust'
import Intro from './RenderContent/Intro';
import Legget from './RenderContent/Legget';
import Bethel from './RenderContent/Bethel';
import Projects from './RenderContent/Projects';
import StellarView from './RenderContent/StellarView';
import SolarEye from './RenderContent/SolarEye';
import BrainRot from './RenderContent/BrainRot';
import Chess from './RenderContent/Chess';
const MyProjects = () => {
  
  const sections: Section[] = [
    { id: 'intro', title: 'My Experience And Projects', color: '#1652b3ff', innnerContent: Intro()  },
    { id: 'intrustbank',  title: 'INTRUST Bank', color: '#5118d6ff', date: 'December 2024 - Current', innnerContent: Intrust()  },
    { id: 'legget&platt', title: 'Legget & Platt', color: '#ec4899', date: 'May 2024 - August 2024', innnerContent: Legget()  },
    { id: 'bethelcollege', title: 'Bethel College', color: '#4b1414ff', date: 'August 2023 - December 2024', innnerContent: Bethel()  },
    { id: 'projects', title: 'Projects Introduction', color: '#f59e0b', innnerContent: Projects()  },
    { id: 'solareye', title: 'Solar Eye', color: '#2b00c7', date: 'NASA Hackathon Award Winner', innnerContent: SolarEye()  },
    { id: 'stellarview', title: 'Stellar View', color: '#7885cf', date: 'NASA Hackathon Submission', innnerContent: StellarView()   },
    { id: 'brainrot', title: 'BrainRot Generator', color: '#f59e0b', date: 'Generate Brainrot with a single click', innnerContent: BrainRot()  },
    { id: 'chess', title: 'Chess With Ai Opponents', color: '#f59e0b', date: 'Play Chess against AI', innnerContent: Chess()  },
  ];


  const { section } = useParams();
  useEffect(() => {
    if (!section) {
      return;
    }

    const ele = document.getElementById(
      section.replace("-", "").replace(" ", "").toLowerCase()
    );
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [section]);
  return (
    <div className="experience">
      <Layout>
          <PogressionMeter sections={sections}/>
          <div className="viewer-width">
            <ObsidianViewer />
          </div>
      </Layout>
      </div>
  );
};

export default MyProjects;
