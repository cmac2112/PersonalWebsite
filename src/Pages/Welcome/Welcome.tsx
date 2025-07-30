import React from 'react'

import { useState, useEffect } from 'react'
import "./Welcome.css"

const Welcome = () => {

    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false);


  return (
    <div className="title-animation-container">
    <h2 className="hello-title">
        Hello sss
    </h2>
    </div>
  )
}

export default Welcome
