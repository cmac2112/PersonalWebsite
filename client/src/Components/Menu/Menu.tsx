import React, { useCallback } from "react";
import Button from "../Button/Button";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import { DefinedRoutes } from "../../Helpers/RouteConstants";
interface MenuProps {
  isMobileDevice: () => boolean;
  handleClose: () => void;
}
const Menu: React.FC<MenuProps> = ({ isMobileDevice, handleClose }) => {
  const navigate = useNavigate();

  const handleRestartAnimation = () => {
    const delayTime = isMobileDevice() ? 400 : 0;
    setTimeout(() => {
      localStorage.removeItem("skipIntro");
      navigate(DefinedRoutes.Landing);
    }, delayTime);
  };

  const handleBasicNavigation = useCallback((route: string) => {
    const delayTime = isMobileDevice() ? 400 : 0;

    setTimeout(() => {
      navigate(route);
    }, delayTime);
  }, []);

  const handleResumeNavigation = useCallback(() => {
    const delayTime = isMobileDevice() ? 400 : 0;

    setTimeout(() => {
    }, delayTime);
    window.open(DefinedRoutes.Resume, "_blank");
  }, []);

  const handleContactScroll = useCallback(() => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      const headerOffset = isMobileDevice() ? 80 : 100;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleExperienceScroll = useCallback(() => {
    const experienceSection = document.getElementById("experience-section");
    if (experienceSection) {
      const headerOffset = isMobileDevice() ? 80 : 100;
      const elementPosition = experienceSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);
  const handleMyProjectsScroll = useCallback(() => {
    const myProjectSection = document.getElementById("my-projects");
    if (myProjectSection) {
      const headerOffset = isMobileDevice() ? 80 : 100;

      const elementPosition = myProjectSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="menu-modal">
      <div className="button-container">
        <Button
          label="Home"
          iconPosition="right"
          OnClickCallback={() => handleBasicNavigation(DefinedRoutes.Home)}
          materialIcon="home"
        />
        <Button
          label="My Resume"
          iconPosition="right"
          OnClickCallback={() => handleResumeNavigation()}
          materialIcon="work_history"
        />
        <Button
          label="Contact Me"
          iconPosition="right"
          OnClickCallback={() => handleContactScroll()}
          materialIcon="call"
        />
        <Button
          label="My Experience"
          iconPosition="right"
          OnClickCallback={() => handleExperienceScroll()}
          materialIcon="Work"
        />
        <Button
          label="My Projects"
          iconPosition="right"
          OnClickCallback={() => handleMyProjectsScroll()}
          materialIcon="experiment"
        />
        <Button
          label="Replay Animation"
          iconPosition="right"
          OnClickCallback={() => handleRestartAnimation()}
          materialIcon="Movie"
        />
        <Button
          label="Play My Chess Bots"
          OnClickCallback={() => handleBasicNavigation(DefinedRoutes.Chess)}
          materialIcon="chess"
          iconPosition="right"
        />
        <Button
          label="Close"
          OnClickCallback={() => handleClose()}
          materialIcon="close"
          iconPosition="right"
        />
      </div>
    </div>
  );
};

export default Menu;
