import { useState } from 'react'

import Welcome from "./Pages/Welcome/Welcome"

import './App.css'
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
function App() {

  //maybe have this in an animation sort of? 
  //Hello
  // have a skip button in the bottom
  // maybe some sound?
  /*
  
  (maybe store a cookie to see if they have been here before and conditionally render some extra text?)
  if yes: "It looks like you have been here before, Welcome back!" (skip animation)
  if no: "It looks like you are new here, let me introduce myself"

  My name is Caden McArthur,

  show images of myself off to the side with nice slide in animation

  Im a software engineer and graduate from Bethel College. 

  During my Tenure at Bethel, I participated in many different activites

  football
  Teaching the community about space through the observatory
  And Leading Bethel's Inagural software club to win awards in hackathons like NASA's Space apps challenge

  My experience includes being an intern at Legget & Platt creating react web apps (Summer 2024)
  A Software Developer Intern/IMS Tecnician at Bethel College (2023-2024)
  And Currently I work at INTRUST Bank in Wichita, Ks developing web applications with the Blazor c# web framework
  
  Take a look around and spend your time exploring my site. Maybe you want to play a game of Chess against one of my home made chess bots?

  Or maybe you are interested in what im working on now in my weekly updates?

  Have fun exploring!
  
  */
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  )
}

export default App
