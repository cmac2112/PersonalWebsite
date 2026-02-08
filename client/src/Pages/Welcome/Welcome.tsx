import { useState, useEffect, useCallback, useMemo } from 'react';
import "./Welcome.css";
import football from '../../assets/football.png';
import pfp from '../../assets/pfp.jpg';
import Tool from '../../Components/Tool/Tool';
import Button from '../../Components/Button/Button';
import "./MediaCss.css"
import { useNavigate } from 'react-router-dom';
import { DefinedRoutes } from '../../Helpers/RouteConstants';
// Types for better type safety
type AnimationStep = 0 | 1 | 2 | 3 | 4 | 5;
type AnimationClass = '' | 'initial' | 'step-2' | 'step-3' | 'step-5' | 'step-6';

interface StorageKeys {
  readonly SKIP_INTRO: 'skipIntro';
  readonly VISIT_COUNT: 'welcomeVisitCount';
  readonly LAST_VISIT: 'lastWelcomeVisit';
}

// Enhanced typing messages for dynamic effect
const typingMessages = [
    "Welcome",
    "Bienvenido",      // Spanish
    "Bienvenue",       // French
    "Willkommen",      // German
    "Benvenuto",       // Italian
    "欢迎",             // Chinese (Simplified)
    "ようこそ",         // Japanese
    "환영합니다",        // Korean
    "Добро пожаловать", // Russian
    "Bem-vindo",       // Portuguese
    "Välkommen",       // Swedish
    "Welkom",          // Dutch
    "Witamy",          // Polish
    "Velkommen",       // Danish/Norwegian
    "Sveiki atvykę",   // Lithuanian
    "Üdvözöljük",      // Hungarian
    "Καλώς ήρθατε",    // Greek
    "ברוך הבא",        // Hebrew
    "أهلاً وسهلاً",     // Arabic
    "Selamat datang",  // Indonesian/Malay
    "Karibu",          // Swahili
    "Tervetuloa",      // Finnish
    "Bine ați venit",  // Romanian
    "Hoş geldiniz",    // Turkish

];


const Welcome = () => {
  // Enhanced state management
  const [animationStep, setAnimationStep] = useState<AnimationStep>(0);
  const [visitCount, setVisitCount] = useState<number>(0);
  const [rememberChoiceModal, setRememberChoiceModal] = useState<boolean>(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string>('');
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [showClickHint, setShowClickHint] = useState<boolean>(true);

  const navigate = useNavigate();

  // Constants
  const STORAGE_KEYS: StorageKeys = {
    SKIP_INTRO: 'skipIntro',
    VISIT_COUNT: 'welcomeVisitCount',
    LAST_VISIT: 'lastWelcomeVisit',
  } as const;

  const ANIMATION_DELAY = 800;
  const MAX_ANIMATION_STEPS = 5;
  const TYPING_SPEED =75;
  const CLICK_HINT_DURATION = 8000; // 8 seconds

  // Animation step mapping - cleaner than array indexing
  const animationSteps: Record<AnimationStep, AnimationClass> = {
    0: '',
    1: 'initial',
    2: 'step-2',
    3: 'step-3',
    4: 'step-5',
    5: 'step-6',
  } as const;

  // Enhanced tools data with categories for better UX
  const tools = useMemo(() => [
    'C#', 'C', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'EF Core',
    'Docker', 'CI/CD', 'Git/GitHub', 'HTML/CSS', 'React', 'Blazor',
    'Visual Studio', 'VS Code', 'JetBrains Rider', 'IntelliJ IDEA', 
    "Azure", "Flask"
  ], []);


  // Storage utilities with error handling
  const getStorageItem = useCallback((key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('LocalStorage access failed:', error);
      return null;
    }
  }, []);

  const setStorageItem = useCallback((key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('LocalStorage write failed:', error);
    }
  }, []);

  // Enhanced typing effect
  useEffect(() => {
    if (animationStep === 1 && typingIndex < typingMessages.length) {
      const message = typingMessages[typingIndex];
      if (currentTypingMessage.length < message.length) {
        const timer = setTimeout(() => {
          setCurrentTypingMessage(message.slice(0, currentTypingMessage.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timer);
      } else {
        // Move to next message after a pause
        const timer = setTimeout(() => {
          setCurrentTypingMessage('');
          setTypingIndex(Math.floor(Math.random() * typingMessages.length));
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [animationStep, currentTypingMessage, typingIndex]);

  // Click hint auto-hide
  useEffect(() => {
    if (animationStep === 1 && showClickHint) {
      const timer = setTimeout(() => {
        setShowClickHint(false);
      }, CLICK_HINT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [animationStep, showClickHint]);

  // Enhanced animation control functions
  const advanceAnimation = useCallback(() => {
    setAnimationStep(prev => {
      const nextStep = Math.min(prev + 1, MAX_ANIMATION_STEPS) as AnimationStep;
      
      if (nextStep === MAX_ANIMATION_STEPS) {
        setIsAnimationComplete(true);
        // Add celebratory effect
        if ('navigator' in window && 'vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
      }
      
      return nextStep;
    });
  }, []);

  const skipToEnd = useCallback(() => {
    setAnimationStep(MAX_ANIMATION_STEPS as AnimationStep);
    setIsAnimationComplete(true);
    navigate(DefinedRoutes.Home);
  }, []);

  // Enhanced click handling with haptic feedback
  const handleScreenClick = useCallback((event: Event) => {
    // Prevent click during modal
    if (rememberChoiceModal) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (animationStep < MAX_ANIMATION_STEPS) {
      advanceAnimation();
      setShowClickHint(true); // Show hint again on interaction
    }
  }, [animationStep, rememberChoiceModal, advanceAnimation]);

  // Modal management with enhanced UX
  const toggleModal = useCallback(() => {
    setRememberChoiceModal(prev => !prev);
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }, []);

  const handleRememberToSkip = useCallback(() => {
    setStorageItem(STORAGE_KEYS.SKIP_INTRO, '1');
    skipToEnd();
    setRememberChoiceModal(false);
    
    // Success feedback
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }, [setStorageItem, STORAGE_KEYS.SKIP_INTRO, skipToEnd]);

  const handleSkipOnce = useCallback(() => {
    skipToEnd();
    setRememberChoiceModal(false);
  }, [skipToEnd]);

  // Initialize component and handle visit tracking
  useEffect(() => {
    const skipAnimationChoice = getStorageItem(STORAGE_KEYS.SKIP_INTRO);
    
    // Skip animation if user chose to remember
    if (skipAnimationChoice === '1') {
      setAnimationStep(MAX_ANIMATION_STEPS as AnimationStep);
      setIsAnimationComplete(true);
      return;
    }

    // Handle visit counting
    const storedVisitCount = getStorageItem(STORAGE_KEYS.VISIT_COUNT);
    const currentCount = storedVisitCount ? parseInt(storedVisitCount, 10) : 0;
    const newCount = currentCount + 1;
    
    setVisitCount(newCount);
    setStorageItem(STORAGE_KEYS.VISIT_COUNT, newCount.toString());
    setStorageItem(STORAGE_KEYS.LAST_VISIT, Date.now().toString());
    
    // Start animation with initial delay for dramatic effect
    setTimeout(() => {
      setAnimationStep(1);
    }, ANIMATION_DELAY);
    
    // This effect should only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Enhanced event listener management
  useEffect(() => {
    if(isAnimationComplete){
      navigate(DefinedRoutes.Home)
    }
    if (rememberChoiceModal) {
    
      return;
    }

    // Add keyboard support for accessibility
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        handleScreenClick(event as KeyboardEvent);
      }
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('click', handleScreenClick);
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('click', handleScreenClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleScreenClick, isAnimationComplete, rememberChoiceModal, toggleModal]);

  // Computed values
  const currentAnimationClass = animationSteps[animationStep];
  const shouldShowScrollContent = isAnimationComplete;
  const shouldHideAnimationContainer = isAnimationComplete;

  // Enhanced welcome message with dynamic content - FIXED: Stable height container
  const welcomeMessage = useMemo(() => {
    if (visitCount === 1) {
      return (
        <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <h2 className='title-component' style={{ margin: '0 0 0.5rem 0' }}>Welcome!</h2>
          <h2 className='title-component' style={{ margin: '0 0 2rem 0' }}>It looks like it's your first time here!</h2>
          {/* Fixed height container for typing text to prevent bouncing */}
          <div style={{ 
            height: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {currentTypingMessage && (
              <p style={{ 
                fontSize: '1.5rem', 
                margin: '0',
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic',
                textAlign: 'center'
              }}>
                {currentTypingMessage}
                <span style={{ 
                  animation: 'blink 1s infinite',
                  marginLeft: '2px' 
                }}>|</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    
    const getMessage = () => {
      if (visitCount <= 5) return `Welcome Back! Visit #${visitCount}`;
      if (visitCount <= 10) return `Hey there, regular! Visit #${visitCount}`;
      if (visitCount <= 25) return `You're becoming a frequent visitor! Visit #${visitCount}`;
      if (visitCount <= 50) return `Wow, ${visitCount} visits! You really like it here!`;
      return `${visitCount} visits?! You're practically family now!`;
    };
    
    return (
      <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column' }}>
        <h2 className='title-component' style={{ margin: '0 0 1rem 0' }}>{getMessage()}</h2>
        <p className="skip-hint" style={{ margin: '0 0 2rem 0' }}>Skip by pressing the button in the top left corner</p>
        {/* Fixed height container for typing text */}
        <div style={{ 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {currentTypingMessage && (
            <p style={{ 
              fontSize: '1rem', 
              margin: '0',
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              {currentTypingMessage}
              <span style={{ 
                animation: 'blink 1s infinite',
                marginLeft: '2px' 
              }}>|</span>
            </p>
          )}
        </div>
      </div>
    );
  }, [visitCount, currentTypingMessage]);

  // Progress indicator for animation
  const progressPercentage = (animationStep / MAX_ANIMATION_STEPS) * 100;

  return (
    <div className={`page-container ${currentAnimationClass} ${shouldShowScrollContent ? "" : "no-scroll"}`}>
      {/* Progress indicator */}
      {!shouldHideAnimationContainer && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '20px',
          width: '200px',
          height: '4px',
          background: 'rgba(143,143,77,0.16)',
          borderRadius: '2px',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #50020E, #E0C500)',
            borderRadius: '2px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(30, 144, 255, 0.5)'
          }} />
        </div>
      )}

      {/* Animation Container */}
      <div className={`title-animation-container ${shouldHideAnimationContainer ? "hidden-display" : ""}`}>
        
        {/* Enhanced Skip Button */}
        <button 
          className="skip-animation" 
          onClick={(e) => {
            e.stopPropagation();
            toggleModal();
          }}
          aria-label="Skip animation"
          title="Skip the introduction animation"
        >
          Skip
        </button>
        
        {/* Enhanced Click Hint with fade out */}
        {animationStep < 2 ?
        <p 
          className={`click-hint ${currentAnimationClass}`}
          style={{ 
            opacity: showClickHint ? undefined : 0.3,
            marginBottom: '4rem',
            transition: 'opacity 1s ease-in-out'
          }}
        >
          (click anywhere to continue)
        </p>
: <></>}
        
        {/* Welcome Title with Enhanced Content */}
        <div className={`hello-title ${currentAnimationClass}`}>
          {welcomeMessage}
        </div>
        
        {/* Name and Profile Picture */}
        <h2 className={`my-name ${animationStep > 1 ? currentAnimationClass : ''}`}>
          My Name is Caden McArthur
        </h2>
        <img 
          src={pfp} 
          alt="Caden McArthur - Software Engineer and Creative Problem Solver"
          className={`pfp-image ${animationStep > 1 ? currentAnimationClass : ''}`}
          loading="eager"
        />
        
        {/* Software Engineer Introduction */}
        <h2 className={`software ${animationStep > 2 ? currentAnimationClass : ''}`}>
          I'm a Software Engineer and one of Bethel College's first software graduates
        </h2>
        <img 
          src={football} 
          alt="Bethel College football team - where teamwork meets technology"
          className={`football-image ${animationStep > 2 ? currentAnimationClass : ''}`}
          loading="lazy"
        />
        {/* Enhanced Tools/Technologies */}
        <h2 className={`experience-text ${animationStep > 3 ? currentAnimationClass : ''}`}>
          I have experience building full stack applications with many different tools and 
          frameworks for several different companies. So have fun exploring my site! 
          If you're looking for a challenge, play one of my homemade chess bots!
        </h2>
        <div className={`toolbox ${animationStep > 3 ? currentAnimationClass : ''}`}>
          <div className='toolbox-container' role="list" aria-label="Technology skills">
            {tools.map((tool, index) => (
              <Tool 
                key={`${tool}-${index}`} 
                text={tool}
              
              />
            ))}
          </div>
        </div>
        
        {/* Modal Overlay */}
        {rememberChoiceModal && <div className="blur-overlay" onClick={toggleModal} />}
        
        {/* Enhanced Skip Choice Modal */}
        <div className={`skip-modal ${rememberChoiceModal ? "active" : ""}`} role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <p>Would you like to remember your choice to skip to the main site from now on?</p>
            <p>This is reversible at any time, so don't sweat it!</p>
            <small style={{ marginTop: '10px', display: 'block' }}>
              You can restart the animation anytime from the main page
            </small>
          </div>
          <div className="modal-buttons-container">
            <Button 
              label='Skip This Time' 
              OnClickCallback={handleSkipOnce}
              aria-label="Skip animation this time only"
            />
            <Button 
              label='Skip Every Time' 
              OnClickCallback={handleRememberToSkip}
              aria-label="Always skip animation in the future"
            />
            <Button  
              label='Close' 
              OnClickCallback={toggleModal}
              aria-label="Close dialog and continue animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Welcome;