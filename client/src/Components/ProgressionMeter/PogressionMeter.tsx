import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import "./PogressionMeter.css"
import SectionComponent from './SectionComponents/SectionComponent';
import type { Section } from '../../Helpers/Section';


interface ScrollProgressMeterProps{
  sections: Section[];
}

const ScrollProgressMeter:React.FC<ScrollProgressMeterProps> = ({sections}) => {

  const { section } = useParams<{section: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const [fadingIn, setFadingIn] = useState<boolean>(false)


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

  useEffect(() => {
    if(section){
      const index = sections.findIndex(s => s.id === section);
      if(index !== -1){
        scrollToSection(index);
      }
    }
  }, [section])

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