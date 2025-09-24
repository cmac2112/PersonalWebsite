/*
import React, {useEffect, useRef} from 'react';
import * as THREE from "three";

const AnimatedImage = () => {
    const canvasRef = useRef<any | undefined>(null);
    const cameraRef = useRef<any | undefined>(null);
    
    useEffect(() =>{
        const scene = new THREE.Scene();
        let clock = new THREE.Clock();

        const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    })

  return (
    <div className='canvas-container'>
      <canvas className='sim' id="webgl-canvas" ref={canvasRef}></canvas>
    </div>
  )
}

export default AnimatedImage
*/