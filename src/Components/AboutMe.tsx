import React from 'react'
import "./AboutMe.css"
import { Navigate } from 'react-router-dom'
import pfp from "../assets/pfp.jpg";
import Button from './Button/Button';
import { useState,useCallback } from 'react';
import MyExperienceTile from './MyExperienceTile/MyExperienceTile';

/*
this component will appear and house all of the about me after the initial animation plays
this part of the site should slide up from the bottom seamlessly and look nice and neat on all dispalys
 */
interface AboutMeProps{
  onRestartAnimation: () => void;
}
const AboutMe:React.FC<AboutMeProps> = ({
  onRestartAnimation
}) => {
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const isMobileDevice = (): boolean => {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // ========================================
  // EVENT HANDLERS
  // ========================================
  const handleRestartAnimation = useCallback(() => {
    if (isRestarting) return; // Prevent multiple clicks
    
    setIsRestarting(true);
    console.log("Restarting animation with mobile-optimized delay");
    
    // Mobile devices get longer delay for button animation completion
    const delayTime = isMobileDevice() ? 600 : 300;
    
    setTimeout(() => {
      onRestartAnimation();
      setIsRestarting(false);
    }, delayTime);
  }, [onRestartAnimation, isRestarting]);

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
    <div className='home'>
      <h1>Home</h1>
      <div className='button-container'>
      <Button label="My Resume" iconPosition='right' OnClickCallback={() => handleResumeNavigation()} materialIcon='Work' />
        <Button label="My Experience" iconPosition='right' OnClickCallback={() => handleExperienceScroll()} materialIcon='Work' />
          <Button label="My Projects" iconPosition='right' OnClickCallback={() => handleMyProjectsScroll()} materialIcon='Work' />
      <Button label="Replay Animation" iconPosition='right' OnClickCallback={() => handleRestartAnimation()} materialIcon='Movie' />
      <Button label="Play My Chess Bots" OnClickCallback={() => handleChessBotNavigation()} materialIcon="chess" iconPosition='right' />
        </div>
      <div className='more-about-me'>
        <h2 className="about-me-header">More About Me!</h2>
        <img src={pfp} className="pfp-img" />
        <p className='about-me-subtitle'>Click on my tiles below to learn about my experience!</p>
        <section id="experience-section">
        <div className='my-experience-list'>
          
        <MyExperienceTile title='Software Developer'
         subtitle='INTRUST Bank'
         technologies={["C#", "SQL", ".NET", "Blazor", "EFCore", "Javascript", "CI/CD"]}>
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
         technologies={["Typescript", "Javascript", "React", "Tailwind CSS"]}>
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
         technologies={["Python", "MySQL", "React","Tailwinds CSS", "Docker", "CI/CD"]}>
          <h2 className='experience-tile-child-header'>
            Developed and worked for Bethel College through the Employment Experience program
          </h2>
          <ul className='experience-list'>
            <li>Developed Python scripts to automatically gather SAT/ACT and ACCUPLACER test scores for Admissions</li>
            <li>Re-created Bethel's job application process through react to begin the transition away from the legacy site</li>
            <li>Responded to trouble tickets and installed hardware as a Student Technician for the IMS department</li>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='Bethel College Software Club Founder' subtitle={`Bethel's First Software Club`}>
          <h2 className='experience-tile-child-header'>Established Bethel's first ever Software Club
            <ul className='experience-list'>
              <li>Represented Bethel in hackathons around the country</li>
              <li>Award winning projects at hackathons like NASA's yearly Space-App Challenge</li>
              <li>Developed projects such as BC-Social, a social media for clubs on campus to better communicate with Students</li>
              <li>Provided job interview prep for members, worked on projects using SCRUM project management for experience, reviewed pull requests and provided feedback, 
                worked on commonly asked job interview DSA questions as a team
              </li>
              <li>Voted 'Best Up and Coming Club'</li>
            </ul>
          </h2>
        </MyExperienceTile>
      </div>
      </section>
      <section id='my-projects'>
        <h2 className="about-me-header">Personal Projects & Hackathon Winners</h2>
        <div className='my-experience-list'>
        <MyExperienceTile title='Chess with AI Opponents' subtitle='Personal Project (In Progress)'
        technologies={["React"]}>
          <h2 className='experience-tile-child-header'>Developed chess in react from scratch and adding homemade AI as a self challenge</h2>
          <ul className='experience-list'>
            <li>Rules of the challenge were to come up with my own version of chess and a verson 1.0 of a bot without using any google or AI help</li>
            <li>Game logic was simple enough to implement, but took it a step further to make it more user friendly in many ways</li>
            <li>Currently only version 1.0 of my bot is playable at the moment (and its sort of impossible to lose against beacuse its not very smart)</li>
            <li>You can play it <a href="/chess">Here</a></li>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile 
        title='Solar Eye'
         subtitle='NASA Space-Apps Award Winner'
         technologies={["React", "ThreeJs", "3D-Graphics", "Simulation"]}>
          <h2 className='experience-tile-child-header'>Solar System Simulation built using real NASA data</h2>
          <ul className='experience-list'>
            <li>Developed a 3D interactable solar system simulation to display near earth asteroids that have the potential to impact earth in the future</li>
            <li>Gathered planet body data from NASA and used orbital calculations to calculate the position a body based on the provided Keplarian orbital parameters in real time</li>
            <li>Won 2 awards out of 6 for our timezone "Peoples Choice" and "Local Impact"</li>
            <li>Site is live <a href='https://cmac2112.github.io/nasaspaceapps/#/solareyes'>Here</a></li>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='BC-Social' subtitle='Club social media project'
        technologies={["React", "MySQL", "Node"]}>
          <p>test</p>
        </MyExperienceTile>
        </div>
      </section>
        {/*
        
        <p>My name is Caden McArthur, I'm a Software Developer currently at INTRUST BANK.</p>
        <p>I graduated from Bethel College in Newton, Ks in December of 2024 with a Bachelors in Computer Science and a Minor in Mathematics.</p>
        <p>I participated in several different activities including playing linebacker for Bethel,
           and establishing the schools first ever Software Club to build projects, spread knowledge, and represent the college at 
           hackathons across the country.</p>
        <img src={award} className="award-img" />
        <h2>Easy Docs Project</h2>
        <p>I attended Kansas University’s hackathon, 
          where I built a RAG AI model integrated 
          with Google OAuth.
           The app would embed the user's Google Docs directly into
            a vector database allowing the user to ask questions about their own notes.
             It also generated practice tests based on the uploaded material,
              making studying more effective. At the time,
               this was one of the first apps to combine AI
                with note-taking platforms like Google Docs,
                 enabling true interactivity with personal notes.
        </p>
        <h2>Sky Watch</h2>
        <p>At Kansas-State University's Hackathon, we developed a mobile app called Sky Watch.
          Sky watch was an app built for users travelling in lesser known areas in the event of severe weather.
          This app allowed users to press a button on the app that would track the user's GPS location and alert the user
          with a very loud notification when a storm warning was issued for their location by the National Weather Service. When a warning is issued, the app
          can direct users to known shelter locations through google maps/apple maps to wait out the event.
        </p>
        <p>put this stuff into panes that when click expand into the full screen</p>
        */}
        
      </div>
    </div>
  )
}



export default AboutMe
