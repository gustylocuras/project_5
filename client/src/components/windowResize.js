import React, { useEffect, useState } from 'react';

function getWindowSize(){
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function UseWindowSize(){
  const [windowSize, setWindowSize] = useState(getWindowSize())

  useEffect(() => {
    function handleResize(){
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return windowSize
}
