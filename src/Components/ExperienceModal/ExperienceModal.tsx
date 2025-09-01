import React from 'react'
interface ExperienceModalProps{
    title: string;
    subtitle?: string;
    technologies: string[];

}

const ExperienceModal:React.FC<ExperienceModalProps> = ({
    title,
    subtitle = '',
    technologies = [],
}) => {
    //modal that will appear when selecting a given tile
    let test = title;
  return (
    <div>
      
    </div>
  )
}

export default ExperienceModal
