import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './style.css'

function Head (props) {

    let countDownTime = 0
    if (props.questionLen == 5) {countDownTime = 60} 
    if (props.questionLen == 10) {countDownTime = 120}
    if (props.questionLen == 15) {countDownTime = 180}
    if (props.questionLen == 20) {countDownTime = 240}

    const headingStyles = {
        color: props.isDarkMode ? 'white' : 'black',
        backgroundColor: props.isDarkMode ? '#001219' : '#D3D3D3'
    }

    return (
        <nav  style={headingStyles}>
            <div className="heading">

                <CountdownCircleTimer
                    key={props.key}
                    onComplete={props.checkAnswersClick}
                    isPlaying={props.isTimerPlaying}
                    duration={countDownTime}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={
                        [countDownTime/2, countDownTime/3, countDownTime/4, countDownTime/5]}
                    size={85}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>

                <DarkModeToggle 
                    checked={props.isDarkMode} 
                    onChange={props.setIsDarkMode} 
                    size={60}
                    speed={2.5}
                />

            </div>
        </nav>
    )
}

export default Head;