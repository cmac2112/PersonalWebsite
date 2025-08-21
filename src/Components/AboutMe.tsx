import React from 'react'
import "./AboutMe.css"
import { Navigate } from 'react-router-dom'
import pfp from "../assets/pfp.jpg";
import award from "../assets/award.jpg"
import Tool from './Tool/Tool';

/*
this component will appear and house all of the about me after the initial animation plays
this part of the site should slide up from the bottom seamlessly and look nice and neat on all dispalys
 */
const AboutMe = () => {
  return (
    <div className='home'>
      <h1>Home</h1>
      <button className="button">My Resume</button>
      <button className="button">Play My Chess Bots</button>
      <button className="button" >Replay Animation</button>
      <div className='more-about-me'>
        <h2 className="about-me-header">More About Me!</h2>
        <p className='about-me-subtitle'>Hello and welcome to my site!</p>
        <img src={pfp} className="pfp-img" />
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
      </div>
    </div>
  )
}



export default AboutMe
