import React from 'react'

import { useState, useEffect } from 'react'
import "./Welcome.css"

import football from '../../assets/football.png';
import grad from '../../assets/grad.jpg';
import pfp from '../../assets/pfp.jpg';

const Welcome = () => {

  const [animationStep, setAnimationStep] = useState<number>(0);
  const [visitCount, setVisitCount] = useState<number>(0);

  const [pfp, setPfp] = useState<string>('');
  const [nasa1, setNasa1] = useState<string>('');
  const [nasa2, setNasa2] = useState<string>('');
  const [nebula, setNebula] = useState<string>('');
  const [award, setAward] = useState<string>('');
  const [aurora, setAurora] = useState<string>('')
  //quick example from copilot
  // looks like we use the animation step to access this array to append to element classnames below


  const initialAnimationSteps: Array<string> = [
    '',        // 0: useeffect will skip, allows for "hello" fade in
    'initial', // 1: should fade in hello on page load
    'step-2', // 2: should fade out hello, and fade in my name after a slight delay
    'step-3',
  ]


  const handleScreenClick = () => {
    if(animationStep < initialAnimationSteps.length - 1){
      setAnimationStep(prev => prev + 1);
      console.log(animationStep)
    }else{
      setAnimationStep(0);
    }
  };
    
  useEffect(() => {
    /*
    const storedVisitCount = localStorage.getItem('welcomeVisitCount');
    const currentCount = storedVisitCount ? parseInt(storedVisitCount) : 0;

    const newCount = currentCount + 1;
    setVisitCount(newCount)
    localStorage.setItem('welcomeVisitCount', newCount.toString());
    
    // Store last visit timestamp
    localStorage.setItem('lastWelcomeVisit', Date.now().toString());
    
    if (newCount > 1) {
      setAnimationStep(2); // Skip to return visitor
    }
      */
  }, [])
  useEffect(() =>{
  
    setAnimationStep(1);
  }, [])

  //use effect is going to add the event listener for each animation step for clicking
  useEffect(() => {
    document.addEventListener('click', handleScreenClick);

    //remove the listener after each click to prevent memory leaks? I think that is the point?
    console.log(animationStep)
    return () => {
      document.removeEventListener('click', handleScreenClick)
    };
    //re add ev listenter on each click
  }, [animationStep])
  return (
    <div className="title-animation-container">
     <p className={`click-hint ${initialAnimationSteps[animationStep]}`}>(click to continue)</p> 
    <h2 className={`hello-title ${initialAnimationSteps[animationStep]} `}>
        Hello
    </h2>
    {/* handle conditional visit text rendering here later */}
    
    <h2 className={`my-name ${animationStep > 1 ? initialAnimationSteps[animationStep] : ''}`}>
        My Name is Caden McArthur
      </h2>
    <h2 className={`software ${animationStep > 2 ? initialAnimationSteps[animationStep] : ''} `}>
      I'm a Software Engineer and a 2025 graduate from Bethel College
    </h2>
    <img src={football} className={`software football-image ${animationStep > 2 ? initialAnimationSteps[animationStep] : ''}`}/>

    </div>
  )
}

export default Welcome
