import React from 'react'
import "./SectionComponent.css"
import "../PogressionMeter.css"
import type { SectionProps } from '../../../Helpers/Section'

const SectionComponent: React.FC<SectionProps> = ({section}) => {
  return (
    <div className="section-content">
        {section.date != null ? 
                <div 
                  className="section-icon"
                  style={{ 
                    backgroundColor: section.color,
                    boxShadow: `0 20px 60px ${section.color}40`
                  }}
                >
                  {section.date}
                </div>
 : <></>}
                <h2 className="section-title">{section.title}</h2>
                <div className="section-description">
                  {section.innnerContent}
                </div>

              </div>
  )
}

export default SectionComponent;
