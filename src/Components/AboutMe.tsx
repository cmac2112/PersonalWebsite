import React from 'react'
import "./AboutMe.css"
import { Navigate } from 'react-router-dom'


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
        <h2>More About Me!</h2>
      </div>
    </div>
  )
}



export default AboutMe
