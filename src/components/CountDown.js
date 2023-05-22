import React from "react";
import { useState,  useRef, useEffect } from "react";

function formatTime (time) {
    let minutes = Math.floor (time / 60)
    let seconds = Math.floor (time - minutes * 60)

    if (minutes <= 10) minutes = '0' + minutes; 
    if (seconds <= 10) seconds = '0' + seconds; 
    return minutes + ':' + seconds
}

function CountDown({ seconds, console, updateCountdown }) {
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();
  
    useEffect(() => {
      timerId.current = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 100);
      return () => clearInterval(timerId.current);
    }, []);
  
    useEffect(() => {
      if (countdown === 0) {
        clearInterval(timerId.current);
        console();
      }
      // Call the updateCountdown callback to update countdown state in App.js
      updateCountdown(countdown);
    }, [countdown, console, updateCountdown]);
  
    return (
      <>
        <h2>Count Down: {formatTime(countdown)}</h2>
      </>
    );
  }
  

export default CountDown;