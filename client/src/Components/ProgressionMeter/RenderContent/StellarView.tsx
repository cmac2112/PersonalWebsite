import Emphasis from "../../Emphasis/Emphasis";
import Button from "../../Button/Button";
import StellarViewImage from "../../../assets/stellarView.png";
import "../PogressionMeter.css";
const StellarView = () => {
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
          Real-time satellite data viewer serving 100+ monthly users with a
          built in Hubble Space Telescope mosaic viewer
        </Emphasis>
      </h2>
      <p>
        Sole developer of a full-stack web application that democratizes access
        to NASA satellite imagery, making complex geospatial data accessible
        directly in the browser. Built for NASA's "Embiggen Your Eyes" challenge
        with the mission of transforming hard-to-reach scientific data into an
        intuitive visual experience.
      </p>
      <p>
        Engineered a solution to render massive .TIF images (40,000+ × 40,000+
        pixels) at lossless quality—replacing the need for expensive enterprise
        desktop software
      </p>
      <p>
        Implemented OpenSeadragon for smooth navigation of stitched Hubble Space
        Telescope mosaics
      </p>
      <p>
        Built a Python-based conversion pipeline using Pillow to translate
        NASA's native .TIF format to browser-compatible formats
      </p>
      <p>
        Deployed LRU caching strategy to optimize load times for frequently
        accessed imagery
      </p>
      <h2>
        <Emphasis>Real-Time Satellite Data Integration</Emphasis>
      </h2>
      <p>
        Integrated live feeds from multiple NASA satellite systems
        (GOES-EAST/WEST, MODIS-TERRA/AQUA)
      </p>
      <p>
        Architected a time-scrubbing feature allowing users to explore
        historical satellite data across any available time period
      </p>
      <p>
        Achieved near-real-time updates with ~15-minute latency matching
        satellite data availability
      </p>
      <p>
        Tackled poorly documented NASA APIs by reverse-engineering a 90,000-line
        XML specification to parse satellite product metadata
      </p>
      <h2>
        <Emphasis>Deployment and Impact</Emphasis>
      </h2>
      <p>
        Successfully deployed and maintaining 100+ monthly active users Provides
        scientists, educators, and space enthusiasts with free access to
        professional-grade satellite imagery tools
      </p>
      <h2>
        <Emphasis>Technical Stack</Emphasis>
      </h2>
      <p>
        <Emphasis>Frontend:</Emphasis> React, OpenSeadragon, CesiumJS for 3D
        globe visualization
      </p>
      <p>
        <Emphasis>Backend:</Emphasis> Python Flask server with Pillow for image
        processing
      </p>
      <p>
        <Emphasis>Architecture:</Emphasis> RESTful API design, stateless backend
        with client-side caching
      </p>
      <h2>
        <Emphasis>Problem-Solving Approach</Emphasis>
      </h2>
      <p>
        The most significant technical challenge was projecting satellite data
        onto the CesiumJS 3D globe with virtually no documentation beyond a
        massive XML specification. Through systematic reverse-engineering and
        iterative testing, I successfully mapped diverse satellite products to
        accurate geospatial coordinates.
      </p>
      <p>
        Managed feature development solo using impact/effort matrix methodology,
        prioritizing high-impact, low-lift features to maximize value within
        competition timeline constraints.
      </p>
      <div className="button-image-container">
        <img className="app-image" src={StellarViewImage} />
        <div className="tile-buttons">
          <Button
            label="View The Site"
            OnClickCallback={() =>
              handleWindowNavigation(
                "https://stellarview.us/",
              )
            }
            materialIcon="planet"
            iconPosition="right"
          />
          <Button
            label="View The Repo"
            OnClickCallback={() =>
              handleWindowNavigation(
                "https://github.com/cmac2112/Stellar-View",
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

export default StellarView;
