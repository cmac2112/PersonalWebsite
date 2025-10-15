import React from 'react'
import "./AboutMe.css"
import pfp from "../../assets/pfp.jpg";
import { useState,useCallback } from 'react';
import MyExperienceTile from '../MyExperienceTile/MyExperienceTile';
import Layout from '../Layout/Layout';

interface AboutMeProps{
  onRestartAnimation: () => void;
}

const AboutMe:React.FC<AboutMeProps> = ({
  onRestartAnimation
}) => {
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const isMobileDevice = () => {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

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


  return (
    <Layout handleRestartAnimation={handleRestartAnimation}>
      
    <div className='home'>

      <div className='more-about-me'>
        <h2 className="about-me-header">About Me</h2>
        <img src={pfp} className="pfp-img" />
        <p className='about-me-subtitle'>Click on my tiles below to learn about my experience!</p>
        <div className='reactive-flexbox'>
        <section id="experience-section">
          <h2 className="about-me-header">Work Experience</h2>
        <div className='my-experience-list'>
          
        <MyExperienceTile title='Software Developer'
         subtitle='INTRUST Bank'
         technologies={["C#", "SQL", ".NET", "EFCore", "Javascript", "CI/CD"]}>
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
        <MyExperienceTile title='Bethel College Software Club Founder' subtitle={`Bethel's First Software Club`}
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
        <MyExperienceTile title='Chess with AI Opponents' subtitle='Personal Project (In Progress)'
        technologies={["React", "Typescript", "CSS"]}>
          <h2 className='experience-tile-child-header'>Developed chess in react from scratch and adding homemade AI as a self challenge</h2>
          <ul className='experience-list'>
            <li>Rules of the challenge were to come up with my own version of chess and a verson 1.0 of a bot without using any google or AI help</li>
            <li>Game logic was simple enough to implement, but took it a step further to make it more user friendly in many ways</li>
            <li>Currently only version 1.0 of my bot is playable at the moment (and its sort of impossible to lose against beacuse its not very smart)</li>
            <a href="/chess">Play chess against my AI bot</a>
            <a href='https://github.com/cmac2112/Chess-With-AI-Opponents'>View the Repository</a>
            
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
            <a href='https://cmac2112.github.io/nasaspaceapps/#/solareyes'>View the Solar Eye simulation</a>
            <a href='https://github.com/cmac2112/nasaspaceapps'>View the Repository</a>
          </ul>
        </MyExperienceTile>
        <MyExperienceTile title='BC-Social' subtitle='Club Social Media'
        technologies={["React", "Typescript", "Javascript", "Tailwinds CSS", "SQL", "MySQL", "Node", "Docker", "Google Cloud"]}>
          <h2 className='experience-tile-child-header'>Working Social Media app with likes, comments, following, image and post creation</h2>
          <ul className='experience-list'>
            <li>Developed a social media clone to begin transition away school wide club announcements from emails (because no one looks at their emails)</li>
            <li>Built with React, Node, and MySQL and handled sign up/sign in authentication with Google OAuth which integrated school accounts seamlessly</li>
            <li>Built customizable bios and profiles for users to access and integrated an infinite scroll home page that would load posts from newest to oldest</li>
            <a href='https://github.com/cmac2112/BethelSocialMedia'>View the Repository</a>
          </ul>
        </MyExperienceTile>
        </div>
      </section>
      </div>
    </div>
    </div>
        
      </div>
    
    </Layout>
  )
}



export default AboutMe
