import "../../../Components/ProgressionMeter/PogressionMeter.css"
import football from "../../../assets/pfp - Copy.jpg"
import "./AboutMeIntro.css"
const AboutMeIntro = () => {
  return (
    <div className="about-me-container">

      <p>Hi, I'm a 23-year-old Software Engineer with a Bachelor's degree in Software Development 
    and a minor in Mathematics from <a href="./Experience/bethelcollege">Bethel College</a>. I'm passionate about building 
    clean, efficient software and tackling complex problems that push me to grow as a developer.
   </p>
        <img className="about-me-pfp" src={football}></img>
      <p>Whether I'm architecting a new feature or debugging a tricky edge case, I bring curiosity 
    and dedication to everything I write. I'm always looking to expand my skill set and 
    contribute to meaningful projects.</p>  
    </div>
  )
}

export default AboutMeIntro
