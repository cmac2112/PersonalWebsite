import React, { useState } from 'react'
import Tool from '../Tool/Tool';
import "./MyExperiencetile.css"
interface MyExperienceTileProps{
    title: string;
    children: React.ReactNode;
    technologies?: string[]; //use tool component for these
    subtitle: string;
}

//lets do the accordian rather than the modal approach
const MyExperienceTile:React.FC<MyExperienceTileProps> = ({
  title,
  children,
  subtitle,
  technologies = [],
}) => {
    const [isOpened, setIsOpened] = useState(false);

    const HandleTileClick = () =>{
      isOpened == false ? setIsOpened(true) : setIsOpened(false);
    }
    const MaterialIcon = ({name}: {name: string})=>(

        <span
        className="material-symbols-outlined button__material-icon dropdown-icon"
        aria-hidden="true">
            {name}
        </span>
    )

    
  return (
    <>

    <div 
    onClick={HandleTileClick}
    className='experience-tile'
    >
      <div className='title-subtitle-container'>
      <h2 className='my-title'>{title}</h2>
      <p className='my-subtitle'>{subtitle}</p>
      </div>
      {isOpened ?
      <>
      {children}
      </> 
      
    : <></>}
    <div className='full-container-width'>
    <div className='tech-container'>
    {technologies.map((t, index) => <Tool key={index} text={t}  /> )}
    </div>
    </div>
    {!isOpened ? 
      <MaterialIcon name='arrow_drop_down' /> :
      <MaterialIcon name='arrow_drop_up' /> 

}
    </div>
    </>
  )
}

export default MyExperienceTile
