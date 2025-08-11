import React from 'react'

import { useState, useEffect } from 'react'
import AboutMe from '../../Components/AboutMe';
import "./Welcome.css"

import football from '../../assets/football.png';
import grad from '../../assets/grad.jpg';
import pfp from '../../assets/pfp.jpg';

const Welcome = () => {

  const [animationStep, setAnimationStep] = useState<number>(0);
  const [visitCount, setVisitCount] = useState<number>(0);
  const [rememberChoiceModal, setRememberChoiceModal] = useState<boolean>(false);



  // first check if user has been here before through local storage, if so use a different array first, if they want to see animation again then 
  // start using the one below

  const initialAnimationSteps: Array<string> = [
    '',        // 0: useeffect will skip, allows for "hello" fade in
    'initial', // 1: should fade in hello on page load
    'step-2', // 2: should fade out hello, and fade in my name after a slight delay
    'step-3',
    'step-4'
  ]



  const handleScreenClick = () => {
    if(animationStep < initialAnimationSteps.length - 1){
      setAnimationStep(prev => prev + 1);
      console.log(animationStep)
    }else{
      setAnimationStep(0);
    }
  };

  const HandleModal = () => {
    setRememberChoiceModal(true);
  }
  const HandleRememberToSkip = () => {
    localStorage.setItem('skipIntro', '1');
    setAnimationStep(initialAnimationSteps.length);
    setRememberChoiceModal(false);
  }
    
  useEffect(() => {
    const skipAnimationChoice = localStorage.getItem('skipIntro');
    if(skipAnimationChoice === '1'){
      console.log('skip set')
      setAnimationStep(initialAnimationSteps.length)
    }
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
    <div className={`page-container ${animationStep >= initialAnimationSteps.length - 1 ? "" : "no-scroll"} `}>
    <div className={`title-animation-container ${animationStep >= initialAnimationSteps.length - 1 ? "hidden-display" : "" }`}>
      
      <button className="skip-animation" onClick={() => HandleModal()}>Skip</button>
      
     <p className={`click-hint ${initialAnimationSteps[animationStep]}`}>(click to continue)</p> 
    {visitCount == 1 ?
    <h2 className={`hello-title ${initialAnimationSteps[animationStep]} `}>
        Welcome, It looks like you are new here!
    </h2>
    :
    <div className={`hello-title ${initialAnimationSteps[animationStep]} `}>
    <h2>
        Welcome Back! You have been here {visitCount} times!
    </h2>
    <p className="skip-hint">Skip by pressing the button in the top left corner</p>
    </div>
}
   
    {/* handle conditional visit text rendering here later */}
    
    <h2 className={`my-name ${animationStep > 1 ? initialAnimationSteps[animationStep] : ''}`}>
        My Name is Caden McArthur
      </h2>
      <img src={pfp} className={`my-name pfp-image ${animationStep > 1 ? initialAnimationSteps[animationStep] : ''} `} />
    <h2 className={`software ${animationStep > 2 ? initialAnimationSteps[animationStep] : ''} `}>
      I'm a Software Engineer and a 2025 graduate from Bethel College
    </h2>
    <img src={football} className={`software football-image ${animationStep > 2 ? initialAnimationSteps[animationStep] : ''}`}/>
    <img src={grad} className={`software grad-image ${animationStep > 2 ? initialAnimationSteps[animationStep] : ''}`} />
    <h2 className={`tenure ${animationStep > 3 ? initialAnimationSteps[animationStep] : ''}`}>
      During my tenure at Bethel College I created the College's first ever software club. We built amazing apps, participated in 
      prestigious hackathons across the country, and were voted 'Best Up and Coming Club' by the school.
    </h2>
    {rememberChoiceModal && <div className="blur-overlay"></div>}
    <div className={`skip-modal ${rememberChoiceModal ? "active" :""}`}>
      <div className="modal-dialog">
      <p>Would you like to remember your choice to skip to the main site from now on?</p>
      <p>This is reversable at any time so dont sweat it!</p>
      </div>
      <div className="modal-buttons-container ">
        <button className="modal-button" onClick={() => { setAnimationStep(initialAnimationSteps.length); setRememberChoiceModal(false); }}>Skip This Time</button>
        <button className="modal-button" onClick={() => HandleRememberToSkip()}>Skip Every Time</button>
      </div>
    </div>
    </div>
    <AboutMe />
    </div>
  )
}

export default Welcome
