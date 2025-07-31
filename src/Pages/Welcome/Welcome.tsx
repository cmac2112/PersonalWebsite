import React from 'react'

import { useState, useEffect } from 'react'
import "./Welcome.css"

const Welcome = () => {

  const [animationStep, setAnimationStep] = useState<number>(0);



    

  return (
    <div className="title-animation-container">
    <h2 className="hello-title">
        Hello sss
    </h2>
    </div>
  )
}

export default Welcome
