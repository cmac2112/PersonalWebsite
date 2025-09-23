import React, {useCallback} from 'react'
import {Navigate} from 'react-router-dom'
import Button from '../Button/Button'
import "./Menu.css"
interface MenuProps{
    handleRestartAnimation: () => void;
    isMobileDevice: () => boolean;
}
const Menu:React.FC<MenuProps> = ({
    handleRestartAnimation,
    isMobileDevice
}) => {
    const handleResumeNavigation = useCallback(() => {
    const delayTime = isMobileDevice() ? 800 : 400;
    
    setTimeout(() => {
      Navigate({ to: "/CadenMcArthurResume.pdf" });
    }, delayTime);
  }, []);

  const handleChessBotNavigation = useCallback(() => {
    const delayTime = isMobileDevice() ? 800 : 400;
    
    setTimeout(() => {
      console.log("Navigating to Chess Bot - placeholder");
      // Navigate({ to: "/chess-bot" });
    }, delayTime);
  }, []);

  const handleExperienceScroll = useCallback(() => {
    const experienceSection = document.getElementById('experience-section');
    if (experienceSection) {
      const headerOffset = isMobileDevice() ? 80 : 100;
      const elementPosition = experienceSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);
  const handleMyProjectsScroll = useCallback(() => {
    const myProjectSection = document.getElementById('my-projects');
    if(myProjectSection){
      const headerOffset = isMobileDevice() ? 80 : 100;

    const elementPosition = myProjectSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className='menu-modal'>
     <div className='button-container'>
      <Button label="My Resume" iconPosition='right' OnClickCallback={() => handleResumeNavigation()} materialIcon='Work' />
        <Button label="My Experience" iconPosition='right' OnClickCallback={() => handleExperienceScroll()} materialIcon='Work' />
          <Button label="My Projects" iconPosition='right' OnClickCallback={() => handleMyProjectsScroll()} materialIcon='Work' />
      <Button label="Replay Animation" iconPosition='right' OnClickCallback={() => handleRestartAnimation()} materialIcon='Movie' />
      <Button label="Play My Chess Bots" OnClickCallback={() => handleChessBotNavigation()} materialIcon="chess" iconPosition='right' />
        </div>
        </div>
  )
}

export default Menu
