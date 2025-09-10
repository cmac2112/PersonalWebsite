import { useState, useEffect, useCallback } from 'react'
import AboutMe from '../../Components/AboutMe';
import "./Welcome.css"
import football from '../../assets/football.png';
import pfp from '../../assets/pfp.jpg';
import award from '../../assets/award.jpg';
import NASA from '../../assets/NASA.jpg';
import Tool from '../../Components/Tool/Tool';
import Button from '../../Components/Button/Button';
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
    'step-4',
    'step-5',
    'step-6',
  ] as const;

  const STORAGE_KEYS ={ //holding the string representation of the keys in the local storage,
    //helps prevent typos
    SKIP_INTRO: 'skipIntro',
    VISIT_COUNT: 'welcomeVisitCount',
    LAST_VISIT: 'lastWelcomeVisit',
  } as const;

const handleRestartAnimation = useCallback(() => {
    // Clear skip preference temporarily
    const skipPreference = localStorage.getItem(STORAGE_KEYS.SKIP_INTRO);
    if (skipPreference) {
      localStorage.setItem(STORAGE_KEYS.SKIP_INTRO, '0');
    }
    const visitCount = localStorage.getItem(STORAGE_KEYS.VISIT_COUNT);
    if(visitCount){
    setVisitCount(parseInt(visitCount));
    }
    // Reset to initial state
    setAnimationStep(0);
    
     setTimeout(() => {setAnimationStep(1)}, 800)
    setRememberChoiceModal(false);
  }, [STORAGE_KEYS.SKIP_INTRO]);

  const handleScreenClick = () => {
    if(animationStep < initialAnimationSteps.length - 1){
      setAnimationStep(prev => prev + 1);
      console.log(animationStep)
    }else{
      setAnimationStep(0);
    }
  };

  const HandleModal = () => {
    setRememberChoiceModal(prev => !prev);
    if(!rememberChoiceModal){
      document.removeEventListener('click', handleScreenClick)
    }else{
      document.addEventListener('click', handleScreenClick);
    }
  }
  const HandleRememberToSkip = () => {
    localStorage.setItem('skipIntro', '1');
    setAnimationStep(6);
    setRememberChoiceModal(false);
  }
    
  useEffect(() => {
    const skipAnimationChoice = localStorage.getItem('skipIntro');
    if(skipAnimationChoice === '1'){
      setAnimationStep(initialAnimationSteps.length)
      return
    }
    const storedVisitCount = localStorage.getItem('welcomeVisitCount');
    const currentCount = storedVisitCount ? parseInt(storedVisitCount) : 0;

    const newCount = currentCount + 1;
    setVisitCount(newCount)
    localStorage.setItem('welcomeVisitCount', newCount.toString());
    
    // Store last visit timestamp
    localStorage.setItem('lastWelcomeVisit', Date.now().toString());
    
    setAnimationStep(1);
      
  }, [initialAnimationSteps.length])


  //use effect is going to add the event listener for each animation step for clicking
  useEffect(() => {
    if(animationStep < 6){
    document.addEventListener('click', handleScreenClick);
    }
    //remove the listener after each click to prevent memory leaks? I think that is the point?
    console.log(animationStep)
    return () => {
      document.removeEventListener('click', handleScreenClick)
    };
    //re add ev listenter on each click
  }, [animationStep])

  return (
    <div className={`page-container ${initialAnimationSteps[animationStep]} ${animationStep >= initialAnimationSteps.length - 1 ? "" : "no-scroll"} `}>
    <div className={`title-animation-container ${animationStep >= initialAnimationSteps.length - 1 ? "hidden-display" : "" }`}>
      
      <button 
    className="skip-animation" 
    onClick={(e) => {
        e.stopPropagation(); // Prevent the click from bubbling up
        HandleModal();
    }}
>
    Skip
</button>
      
     <p className={`click-hint ${initialAnimationSteps[animationStep]}`}>(click to continue)</p> 
    {visitCount == 1 ?
    <div className={`hello-title ${initialAnimationSteps[animationStep]} `}>
    <h2>
        Welcome!
    </h2>
    <h2>
      It looks like it's your first time here!
    </h2>
    </div>
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
    <h2 className={`tenure-text ${animationStep > 3 ? initialAnimationSteps[animationStep] : ''}`}>
      During my time at Bethel I created the schools first Software club. We built apps, participated in hackathons around the country,
      and won some amazing awards
    </h2>
    <img src={award} className={`award-image ${animationStep > 3 ? initialAnimationSteps[animationStep] : ''}`} />
    <img src={NASA} className={`nasa-image ${animationStep > 3 ? initialAnimationSteps[animationStep] : ''}`} />
    <h2 className={`experience-text ${animationStep > 4 ? initialAnimationSteps[animationStep] : ''}`}>
      I have expereince building full stack applications with many different tools and frameworks for several different companies.
      So have fun exploring my site! If you are looking for a challenge. Play one of my homemade chess Bots!
    </h2>

      
    <div className={`toolbox ${animationStep > 4 ? initialAnimationSteps[animationStep] : ''}`}>
      <div className='toolbox-container'>
      <Tool text="C#" />
      <Tool text="Python" />
      <Tool text="Typescript" />
      <Tool text="Javascript" />
      <Tool text="Sql" />
      <Tool text="EFCore" />
      <Tool text="Docker" />
      <Tool text="CI/CD" />
      <Tool text="Git/Github" />
      <Tool text="HTML/CSS" />
      <Tool text="React" />
      <Tool text="Blazor" />
      <Tool text="Visual Studio" />
      <Tool text="Visual Studio Code" />
      <Tool text="Jetbrains Rider" />
      <Tool text="Jetbrains IntelliJ IDEA" />
      
      </div>
    </div>
    {rememberChoiceModal && <div className="blur-overlay"></div>}
    <div className={`skip-modal ${rememberChoiceModal ? "active" :""}`}>
      <div className="modal-dialog">
      <p>Would you like to remember your choice to skip to the main site from now on?</p>
      <p>This is reversable at any time so dont sweat it!</p>
      </div>
      <div className="modal-buttons-container ">
        <Button label='Skip This Time' OnClickCallback={() => {setAnimationStep(initialAnimationSteps.length - 2 ); setRememberChoiceModal(false);}}  />
        <Button label='Skip Every Time' OnClickCallback={() => HandleRememberToSkip()} />
        <Button  label='Close' OnClickCallback={() => HandleModal()} />
      </div>
    </div>
    </div>
    <div className={`main-page ${animationStep >= 6 ? "slide" : ""}`}>
      


    <AboutMe onRestartAnimation={handleRestartAnimation} />

  
    
</div>
    </div>
  )
}

export default Welcome
