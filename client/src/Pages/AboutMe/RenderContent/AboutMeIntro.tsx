import "../../../Components/ProgressionMeter/PogressionMeter.css"
import football from "../../../assets/pfp - Copy.jpg"
import "./AboutMeIntro.css"
const AboutMeIntro = () => {
  return (
    <div className="about-me-container">
      <h2>This part of the site is all about me and my interests!</h2>
      <p>This section is not quite complete yet</p>
      <p>Currently as of writing this im a 23 year old software engineer graduate from <a href="./Experience/bethelcollege">Bethel College</a> with a degree of Sofware Development and a minor in Mathematics </p>
        <img className="about-me-pfp" src={football}></img>
      <p>I throughly enjoy writing software every day and learning to solve tough complex problems</p>  
    </div>
  )
}

export default AboutMeIntro
