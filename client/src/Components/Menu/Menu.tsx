import React, { useCallback, useEffect } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { DefinedRoutes } from "../../Helpers/RouteConstants";
interface MenuProps {
  isMobileDevice: () => boolean;
  handleClose: () => void;
}
const Menu: React.FC<MenuProps> = ({ isMobileDevice, handleClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

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
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 sm:left-auto sm:right-4 sm:top-20 sm:translate-x-0">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="animate-menu-in w-[min(88vw,21rem)] rounded-3xl border border-white/10 bg-[#0c0c0c]/95 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-xl sm:p-5"
        >
          <nav className="flex flex-col gap-2.5">
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
              materialIcon="work"
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
              materialIcon="movie"
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
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;
