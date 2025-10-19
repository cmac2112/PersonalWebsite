import React, { useState, useEffect } from 'react'
import HHNebula from "../../assets/slideshow/hhnebulaj700.jpg"
import Pfp from "../../assets/pfp.jpg";
import SatView from "../../assets/slideshow/StellarSatView.jpg"
import PfpDesktop from "../../assets/slideshow/pfpdesktop.jpg"
import "./Slideshow.css"
import MaterialIcon from '../MaterialIcon/MaterialIcon';


// slideshow component that should have arrow buttons on left and right to move between slides
// slides should have text on it that is not part of the picture (so overlayed)

//need to keep track of the image on the page and conditionally render text 
//text should fade in and slide up on each slide
const Slideshow = () => {

    const slideArray: string[] = [
        PfpDesktop,
        SatView,
        HHNebula,
        
    ]

    const [slideNumber, setSlideNumber] = useState<number>(0);
const [fadeIn, setFadeIn] = useState<boolean>(true);

    useEffect(() => {
        setFadeIn(true);
        const timeout = setTimeout(() => setFadeIn(false), 2000); // match animation duration
        return () => clearTimeout(timeout);
    }, [slideNumber]);
    const HandleSlideChange = (forwards: boolean) => {
        if (forwards) {
            setSlideNumber(prev => (prev === slideArray.length - 1 ? 0 : prev + 1));
        } else {
            setSlideNumber(prev => (prev === 0 ? slideArray.length - 1 : prev - 1));
        }
    };
  return (
    <>
    <div className='slideshow-container'>
        <img
                    className={`slide${fadeIn ? ' fade-in' : ''}`}
                    src={slideArray[slideNumber]}
                    alt={`slide-${slideNumber}`}
                />
        {slideNumber === 0 ? <div className={`slide-1-hello ${fadeIn ? ' fade-in' : ''}`}>
            <h1 className='slide-title'>Hello</h1>
            <h2 className='slide-subtitle'>I'm Caden McArthur</h2>
        
        </div> : slideNumber === 1 ? <div className={`slide-1-hello ${fadeIn ? ' fade-in' : ''}`}>
            <h1 className='slide-title white'>My Projects</h1>
            <h2 className='slide-subtitle white'>And Experience</h2>
            </div>
        
        
        : slideNumber === 2 ? <div className={`slide-1-hello ${fadeIn ? ' fade-in' : ''}`}>
                <h1 className='slide-title white'>My Gallery</h1>

            </div>
            : <></>}
        <span
            className='back-arrow'
            style={
                slideNumber === 1 || slideNumber === 2
                    ? { color: 'white' }
                    : undefined
            }
            onClick={() => HandleSlideChange(false)}
        >
        <MaterialIcon name='arrow_back' />
        <p className='arrow-label'>Back</p>
        </span>
        <span className='forward-arrow' style={
                slideNumber === 1 || slideNumber === 2
                    ? { color: 'white' }
                    : undefined
            }
            onClick={() => HandleSlideChange(true)}>
            <p className='arrow-label'>Next</p>
        <MaterialIcon name='arrow_forward' />
        
        </span>
    </div>

    </>
  )
}

export default Slideshow
