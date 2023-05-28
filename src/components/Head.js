import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import "./style.css";

function Head(props) {
  const headingStyles = {
    color: props.isDarkMode ? "white" : "black",
    backgroundColor: props.isDarkMode ? "#021B2C" : "#edfcfc",
  };

  let countDownTime = 0;
  if (props.questionLen == 5) {
    countDownTime = 30;
  }
  if (props.questionLen == 10) {
    countDownTime = 60;
  }
  if (props.questionLen == 15) {
    countDownTime = 90;
  }
  if (props.questionLen == 20) {
    countDownTime = 120;
  }

  const selectedAnswers = props.selectedAnswers;

  const answersdList = [];
  for (let i = 0; i < selectedAnswers.length; i++) {
    if (selectedAnswers[i] !== null) {
      answersdList.push(selectedAnswers[i]);
    }
  }

  const percentageOfSelectedAnswers =
    (answersdList.length / selectedAnswers.length) * 100;

  return (
    <header style={headingStyles}>
      <div className="header--div">
        <CountdownCircleTimer
          key={props.key}
          onComplete={props.checkAnswersClick}
          isPlaying={props.isTimerPlaying}
          duration={countDownTime}
          colors={props.isDarkMode ? "#408E61" : "#94D7A2"}
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

      <div className="header--progress-bar">
        <Progress
          percent={percentageOfSelectedAnswers}
          theme={{
            success: {
              symbol: " ",
              color: props.isDarkMode ? "#408E61" : "#94D7A2",
            },

            active: {
              symbol: " ",
              color: props.isDarkMode ? "#444C87" : "#7885cf",
            },

            default: {
              symbol: " ",
              color: "",
            },
          }}
        />
        <p className="progress-bar--meter">
          {answersdList.length}/{selectedAnswers.length}
        </p>
      </div>
    </header>
  );
}

export default Head;
