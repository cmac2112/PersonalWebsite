import Emphasis from "../../Emphasis/Emphasis";
import "../PogressionMeter.css";
import SolarEyeImage from "../../../assets/solareye.png";
import Button from "../../Button/Button";

const SolarEye = () => {
  const isMobileDevice = () => {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    );
  };
  const handleWindowNavigation = (url: string) => {
    const delayTime = isMobileDevice() ? 200 : 100;
    setTimeout(() => {
      window.open(url, "_blank");
    }, delayTime);
  };
  return (
    <div>
      <h2>
        <Emphasis>
          2x Award Winner of the 2024 NASA Space Apps Challenge
        </Emphasis>
      </h2>
      <p>React/Three.js</p>
      <p>
        Developed an interactive 3D solar system visualization that renders
        real-time orbital mechanics for 300+ near-Earth asteroids and all major
        planets using NASA's Near-Earth Object database.
      </p>
      <p>
        Architected and implemented the entire Three.js-based 3D simulation
        engine with real-time orbital propagation from Keplerian parameters
      </p>
      <p>
        Designed intuitive camera controls and interactive 3D navigation
        allowing users to explore complex orbital trajectories from any
        perspective
      </p>
      <p>
        Integrated NASA's NEO API data pipeline to populate accurate orbital
        elements for asteroids and planetary bodies
      </p>
      <div className="button-image-container">
        <img className="app-image" src={SolarEyeImage} />
        <div className="tile-buttons">
          <Button
            label="View The Simulation"
            OnClickCallback={() =>
              handleWindowNavigation(
                "https://cmac2112.github.io/nasaspaceapps/#/solareyes",
              )
            }
            materialIcon="planet"
            iconPosition="right"
          />
          <Button
            label="View The Repo"
            OnClickCallback={() =>
              handleWindowNavigation(
                "https://github.com/cmac2112/nasaspaceapps",
              )
            }
            materialIcon="code"
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default SolarEye;
