import { useState, useEffect, useRef } from "react";
import HHNebula from "../../assets/slideshow/hhnebulaj700.jpg";
import SatView from "../../assets/slideshow/StellarSatView.jpg";
import PfpDesktop from "../../assets/slideshow/pfpdesktop.jpg";
import "./Slideshow.css";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import Button from "../Button/Button";
import Blog from "../../assets/slideshow/code.jpg";
import { useNavigate } from "react-router-dom";
import { DefinedRoutes } from "../../Helpers/RouteConstants";
// slideshow component that should have arrow buttons on left and right to move between slides
// slides should have text on it that is not part of the picture (so overlayed)

//need to keep track of the image on the page and conditionally render text
//text should fade in and slide up on each slide
const Slideshow = () => {
  const slideArray: string[] = [PfpDesktop, SatView, Blog,HHNebula];
  const isMobileDevice = () => {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  };
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(true);

  
  const manualAdvanceRef = useRef<boolean>(false);

  const handleNewWindowNavigation = (url: string) => {
    const delayTime = isMobileDevice() ? 350 : 0;
    setTimeout(() => {
      navigate(url);
    }, delayTime);
  };

  const HandleSlideChange = (forwards: boolean) => {
    manualAdvanceRef.current = true;
    if (forwards) {
      setSlideNumber((prev) => (prev === slideArray.length - 1 ? 0 : prev + 1));
    } else {
      setSlideNumber((prev) => (prev === 0 ? slideArray.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
  let timeout;
  if (manualAdvanceRef.current) {
    timeout = setTimeout(() => {
      HandleSlideChange(true);
      manualAdvanceRef.current = false;
    }, 20000); // 20 seconds after manual
  } else {
    timeout = setTimeout(() => {
      HandleSlideChange(true);
    }, 8000); // 8 seconds auto
  }
  return () => clearTimeout(timeout);
}, [slideNumber]);

  useEffect(() => {
    setFadeIn(true);
    const timeout = setTimeout(() => setFadeIn(false), 500); // match animation duration
    return () => clearTimeout(timeout);
  }, [slideNumber]);

  
  return (
    <>
      <div className="slideshow-container">
        <img
          className={`slide${fadeIn ? " fade-in" : ""}`}
          src={slideArray[slideNumber]}
          alt={`slide-${slideNumber}`}
        />
        {slideNumber === 0 ? (
          <div className={`slide-1-hello ${fadeIn ? " fade-in" : ""}`}>
            <h1 className="slide-title">Hello</h1>
            <h2 className="slide-subtitle">I'm Caden McArthur</h2>
            <div className="slide-button-container">
              <Button
                label="Who Am I?"
                OnClickCallback={() => handleNewWindowNavigation(`${DefinedRoutes.Story}`)}
                materialIcon="person_celebrate"
                iconPosition="right"
              />
            </div>
          </div>
        ) : slideNumber === 1 ? (
          <div className={`slide-1-hello ${fadeIn ? " fade-in" : ""}`}>
            <h1 className="slide-title white">My Projects</h1>
            <h2 className="slide-subtitle white">And Experience</h2>
            <div className="slide-button-container">
              <Button
                label="Explore"
                OnClickCallback={() =>
                  handleNewWindowNavigation(`${DefinedRoutes.Projects}`)
                }
                materialIcon="ar_stickers"
                iconPosition="right"
              />
            </div>
          </div>
        ): slideNumber === 2 ? (
          <div className={`slide-1-hello ${fadeIn ? " fade-in" : ""}`}>
            <h1 className="slide-title white">My Blog</h1>
            <h2 className="slide-subtitle white">What am I working on?</h2>
            <div className="slide-button-container">
              <Button
                label="Blog"
                OnClickCallback={() => handleNewWindowNavigation(`${DefinedRoutes.Blog}`)}
                materialIcon="edit"
                iconPosition="right"
              />
            </div>
          </div>
        ) 
        
        : slideNumber === 3 ? (
          <div className={`slide-1-hello ${fadeIn ? " fade-in" : ""}`}>
            <h1 className="slide-title white">My Gallery</h1>
            <h2 className="slide-subtitle white">Explore The Cosmos</h2>
            <div className="slide-button-container">
              <Button
                label="My Astrophotography"
                OnClickCallback={() => handleNewWindowNavigation(`${DefinedRoutes.Images}`)}
                materialIcon="moon_stars"
                iconPosition="right"
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <span
          className="back-arrow"
          style={
            slideNumber === 1 || slideNumber === 2 || slideNumber === 3
              ? { color: "white" }
              : undefined
          }
          onClick={() => HandleSlideChange(false)}
        >
          <MaterialIcon name="arrow_back" />
          <p className="arrow-label">Back</p>
        </span>
        <span
          className="forward-arrow"
          style={
            slideNumber === 1 || slideNumber === 2 || slideNumber === 3
              ? { color: "white" }
              : undefined
          }
          onClick={() => HandleSlideChange(true)}
        >
          <p className="arrow-label">Next</p>
          <MaterialIcon name="arrow_forward" />
        </span>
      </div>
    </>
  );
};

export default Slideshow;
