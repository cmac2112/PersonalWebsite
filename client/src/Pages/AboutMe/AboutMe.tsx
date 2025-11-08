import "./AboutMe.css"
import MyExperienceTile from '../../Components/MyExperienceTile/MyExperienceTile';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import StellarViewImage from "../../assets/stellarView.png";
import SolarEyeImage from "../../assets/solareye.png";
import Slideshow from '../../Components/Slideshow/Slideshow';
import MaterialIcon from '../../Components/MaterialIcon/MaterialIcon';
import { useEffect, useState } from "react";

const AboutMe = () => {
  const isMobileDevice = () => {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const navigate = useNavigate();

  const handleWindowNavigation = (url: string) =>{
    const delayTime = isMobileDevice() ? 200 : 100;
    setTimeout(() => {
      window.open(url, "_blank");
    }, delayTime);
  }
  const [fadingIn, setFadingIn] = useState<boolean>(false)
  useEffect(() => {
    setFadingIn(true);
    const timeout = setTimeout(() => setFadingIn(false), 500); // match animation duration
    return () => clearTimeout(timeout);
  },[])
  return (
    
    <div className='home'>
      <Layout>
      <Slideshow />
      <div className={`more-about-me white ${fadingIn ? "fade-in" : ""}`}>
        <p className='about-me-subtitle white'>Just skimming? Below are some quick descriptions of my projects and experience.</p>
        <p className='about-me-subtitle white'>More in depth descriptions can be found on the Personal Projects page.</p>
        <MaterialIcon name="arrow_downward" />
        <div className='reactive-flexbox'>
        <section id="experience-section">
          <h2 className="about-me-header">Work Experience</h2>
        <div className='my-experience-list'>
        <MyExperienceTile title='Software Developer'
         subtitle='INTRUST Bank'
         technologies={["Blazor", "C#", "SQL", ".NET", "EFCore", "Javascript", "CI/CD", "Azure"]}>
          <h2 className='experience-tile-child-header'>Developed and Maintained 30+ internal banking solutions for INTRUST</h2>
          <ul className="experience-list">
  <li>Developed an app that created, documented, and prepared investment wealth accounts for trading</li>
  <li>Developed incident tracking software for multiple units, including Physical Security</li>
  <li>Built statistical dashboards for developers to monitor errors and active users in real time</li>
  <li>Implemented unit tests and integrated CI/CD pipelines to streamline test server deployments</li>
  <li>Collaborated with business units by attending meetings and gathering requirements</li>
  <li>Leading migration of developer operations to Azure Dev Ops</li>
  <li>Continuously developed reusable components and enhancements on an internal Nuget library that is used across all INTRUST apps</li>
</ul>
        </MyExperienceTile>
        <MyExperienceTile
         title='Front-End Software Engineer Intern'
         subtitle='Legget & Platt'
         technologies={["Typescript", "React", "Tailwind CSS"]}>
          <h2 className='experience-tile-child-header'>
            Developed React components for internal applications.
          </h2>
          <ul className='experience-list'>
            <li>Developed in app communication features and integrated multi-language support for branches across the world</li>
            <li>Participated in SCRUM meetings, contributed to sprint planning, daily standups and sprint retrospectives</li>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='Software Developer / IMS Technician'
         subtitle='Bethel College'
         technologies={["Python", "MySQL", "React","TailwindCSS", "Docker", "CI/CD"]}>
          <h2 className='experience-tile-child-header'>
            Developed and worked for Bethel College through the Employment Experience program
          </h2>
          <ul className='experience-list'>
            <li>Developed Python scripts to automatically gather SAT/ACT and ACCUPLACER test scores for Admissions</li>
            <li>Re-created Bethel's job application process through react to begin the transition away from the legacy site</li>
            <li>Responded to trouble tickets and installed hardware as a Student Technician for the IMS department</li>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='Bethel College Software Club' subtitle={`Founder of Bethel's First Software Club`}
        technologies={["Job Prep", "Hackathons", "Group Projects", "Leadership", "Team Building"]}>
          <h2 className='experience-tile-child-header'>Established Bethel's first ever Software Club</h2>
            <ul className='experience-list'>
              <li>Represented Bethel in hackathons around the country</li>
              <li>Award winning projects at hackathons like NASA's yearly Space-App Challenge</li>
              <li>Developed projects such as BC-Social, a social media for clubs on campus to better communicate with Students</li>
              <li>Provided job interview prep for members, worked on projects using SCRUM project management for experience, reviewed pull requests and provided feedback, 
                worked on commonly asked job interview DSA questions as a team
              </li>
              <li>Voted 'Best Up and Coming Club'</li>
            </ul>
          
        </MyExperienceTile>
      </div>
      </section>
      <div className='personal-projects-container'>
      <section id='my-projects'>
        <h2 className="about-me-header">Personal Projects</h2>
        <div className='my-experience-list'>
          <MyExperienceTile title='Stellar View' subtitle='NASA Sattelite Data Visualizer'
        technologies={["React", "Typescript", "Tailwindcss", "Python", "Flask", "CesiumJS"]}>
          <h2 className='experience-tile-child-header'>Visualize NASA Sattelite Data In Near Real Time</h2>
          <ul className='experience-list'>
            <li>Built for the challenge statement "Embiggen Your Eyes" with the goal of making hard to reach NASA data more accessable</li>
            <li>View near live sattelite views of the earth from GOES-EAST/WEST, MODIS-TERRA/AQUA and much more in near real time!</li>
            <li>One of the only apps that allows for in browser .TIF image viewing for NASA's large 40k pixel wide images at lossless quality. Doing the job of paid enterprise software right on the browser</li>
            <img className='app-images' src={StellarViewImage} />
            <div className='tile-buttons'>
            <Button label='Go To Live Site' OnClickCallback={() => handleWindowNavigation("https://stellarview.us/")} materialIcon='orbit' iconPosition='right'/>
            <Button label='View The Repo' OnClickCallback={() => handleWindowNavigation("https://github.com/cmac2112/Stellar-View")} materialIcon='code' iconPosition='right' />
            </div>
            
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='Chess with AI Opponents' subtitle='Personal Project (In Progress)'
        technologies={["React", "Typescript", "CSS"]}>
          <h2 className='experience-tile-child-header'>Developed chess in react from scratch and adding homemade AI as a self challenge</h2>
          <ul className='experience-list'>
            <li>Rules of the challenge were to come up with my own version of chess and a verson 1.0 of a bot without using any google or AI help</li>
            <li>Game logic was simple enough to implement, but took it a step further to make it more user friendly in many ways</li>
            <li>Currently only version 1.0 of my bot is playable at the moment (and its sort of impossible to lose against beacuse its not very smart)</li>
            <div className='tile-buttons'>
            <Button label='Play My Chess Bots!' OnClickCallback={() => navigate("/chess")} materialIcon='chess' iconPosition='right'/>
            <Button label='View The Repo' OnClickCallback={() => handleWindowNavigation("https://github.com/cmac2112/Chess-With-AI-Opponents")} materialIcon='code' iconPosition='right' />
            </div>
            
          </ul>
        </MyExperienceTile>
        <MyExperienceTile 
        title='Solar Eye'
         subtitle='NASA Space-Apps Award Winner'
         technologies={["React", "ThreeJs", "3D-Graphics", "Simulation", "GLSL"]}>
          <h2 className='experience-tile-child-header'>Dangerous Asteroid Visualizer NASA Award Winner</h2>
          <ul className='experience-list'>
          
            <li>Developed a 3D interactable solar system simulation to display near earth asteroids that have the potential to impact earth in the future</li>
            <li>Gathered planet body data from NASA and used orbital calculations to calculate the position of a orbital body based on the provided Keplarian orbital parameters in real time</li>
            <li>Won 2 awards "Peoples Choice" and "Local Impact"</li>
            <img className='app-images' src={SolarEyeImage} />
            <div className='tile-buttons'>
              <Button label='View The Simulation' OnClickCallback={() => handleWindowNavigation("https://cmac2112.github.io/nasaspaceapps/#/solareyes")} materialIcon='planet' iconPosition='right' />
                <Button label='View The Repo' OnClickCallback={() => handleWindowNavigation("https://github.com/cmac2112/nasaspaceapps")} materialIcon='code' iconPosition='right' />
            </div>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='BC-Social' subtitle='Club Social Media'
        technologies={["React", "Typescript", "Javascript", "TailwindCSS", "SQL", "MySQL", "Node", "Docker", "Google Cloud"]}>
          <h2 className='experience-tile-child-header'>Working Social Media app with likes, comments, following, image and post creation</h2>
          <ul className='experience-list'>
            <li>Developed a social media clone to begin transition away school wide club announcements from emails (because no one looks at their emails)</li>
            <li>Built with React, Node, and MySQL and handled sign up/sign in authentication with Google OAuth which integrated school accounts seamlessly</li>
            <li>Built customizable bios and profiles for users to access and integrated an infinite scroll home page that would load posts from newest to oldest</li>
            <div className='tile-buttons'>
              <Button label='View The Repo' OnClickCallback={() => handleWindowNavigation("https://github.com/cmac2112/BethelSocialMedia")} materialIcon='code' iconPosition='right' />
            </div>
          </ul>
        </MyExperienceTile>
        </div>
      </section>
      </div>
    </div>
    </div>
    </Layout>
        
      </div>
    
  )
}



export default AboutMe
