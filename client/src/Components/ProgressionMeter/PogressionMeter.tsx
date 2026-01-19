import { useState, useEffect, useRef } from 'react';
import "./PogressionMeter.css"
import SectionComponent from './SectionComponents/SectionComponent';
import Intrust from './RenderContent/Intrust'
import Intro from './RenderContent/Intro';
import Legget from './RenderContent/Legget';
import Bethel from './RenderContent/Bethel';
import Projects from './RenderContent/Projects';
import StellarView from './RenderContent/StellarView';
import type { Section } from '../../Helpers/Section';
import SolarEye from './RenderContent/SolarEye';
import BrainRot from './RenderContent/BrainRot';
import Chess from './RenderContent/Chess';
const ScrollProgressMeter = () => {

  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const [fadingIn, setFadingIn] = useState<boolean>(false)

  const sections: Section[] = [
    { id: 'intro', title: 'My Experience And Projects', color: '#1652b3ff', innnerContent: Intro()  },
    { id: 'intrustbank',  title: 'INTRUST Bank', color: '#5118d6ff', date: 'December 2024 - Current', innnerContent: Intrust()  },
    { id: 'legget', title: 'Legget & Platt', color: '#ec4899', date: 'May 2024 - August 2024', innnerContent: Legget()  },
    { id: 'bethel', title: 'Bethel College', color: '#4b1414ff', date: 'August 2023 - December 2024', innnerContent: Bethel()  },
    { id: 'projects', title: 'Projects Introduction', color: '#f59e0b', innnerContent: Projects()  },
    { id: 'solareye', title: 'Solar Eye', color: '#2b00c7', date: 'NASA Hackathon Award Winner', innnerContent: SolarEye()  },
    { id: 'stellarview', title: 'Stellar View', color: '#7885cf', date: 'NASA Hackathon Submission', innnerContent: StellarView()   },
    { id: 'brainrot', title: 'BrainRot Generator', color: '#f59e0b', date: 'Generate Brainrot with a single click', innnerContent: BrainRot()  },
    { id: 'chess', title: 'Chess With Ai Opponents', color: '#f59e0b', date: 'Play Chess against AI', innnerContent: Chess()  },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      setScrollProgress(Math.min(progress, 100));

      let currentSection = 0;
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection = index;
          }
        }
      });
      setActiveSectionIndex(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToSection = (index: number): void => {
    sectionsRef.current[index]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  useEffect(() => {
    setFadingIn(true);
    const timeout = setTimeout(() => setFadingIn(false), 500);
    return () => clearTimeout(timeout);
  },[])

  return (
    <>

      <div className={`page-container ${fadingIn ? "fade-in" : ""}`}>
        {/* Fixed Progress Meter */}
        <div className="progress-meter-fixed">
          <div>
            <div className="meter-track">
              <div 
                className="meter-progress"
                style={{ height: `${scrollProgress}%` }}
              >
                <div className="meter-glow" />
              </div>
            </div>

            {/* Section markers */}
            <div className="markers-container">
              {sections.map((section, index) => {
                const position = ((index + 0.5) / sections.length) * 100;
                const isActive = index === activeSectionIndex;
                const isPassed = scrollProgress >= position;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className="marker-button"
                    style={{ top: `${position}%` }}
                  >
                    <div 
                      className={`marker-dot ${isActive ? 'active' : ''}`}
                      style={{ 
                        backgroundColor: isPassed ? section.color : '#475569',
                        boxShadow: isPassed ? `0 0 15px ${section.color}80` : 'none'
                      }}
                    />
                    
                    <div className="marker-tooltip">
                      <div className="tooltip-content">
                        {section.title}
                        <div className="tooltip-arrow" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="content-container">
          {sections.map((section, index) => (
            <section
              key={section.id}
              ref={el => { sectionsRef.current[index] = el; }}
              className="section"
            >
              <SectionComponent section={section} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollProgressMeter;