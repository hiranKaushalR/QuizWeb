import React from "react";
import { useState, useEffect } from "react";
const he = require("he");

function Quiz(props) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const answers = [...props.incorrectAnswers];
  const correctAnswer = props.correctAnswer;
  const isDarkMode = props.isDarkMode;

  useEffect(() => {
    const shuffled = [...answers];
    const ranNumForAnswerMix = Math.floor(Math.random() * (answers.length + 1));
    shuffled.splice(ranNumForAnswerMix, 0, correctAnswer);
    setShuffledAnswers(shuffled);
  }, []);

  const decodedQuestion =
    typeof props.question === "string"
      ? he.decode(props.question)
      : props.question;
  // const decodedCorrectAnswer =
  //   typeof correctAnswer === "string"
  //     ? he.decode(correctAnswer)
  //     : correctAnswer;

  const selectAnswer = (answer) => {
    props.selectAnswer(answer);
  };

  const hLineStyles = {
    backgroundColor: isDarkMode ? '#3D3B3B' : '#A6A2A2'
  }

  const answerButtons = shuffledAnswers.map((answer, index) => {
    const isSelected = answer === props.selectedAnswer;
    const isCorrect = answer === props.correctAnswer;

    let buttonStyle = {
      color: isDarkMode ? "white" : "#293264",
      backgroundColor: isDarkMode ? "transparent" : "transparent",
    };

    if (isSelected) {
      buttonStyle = isDarkMode
        ? { color: "#ECECEC", backgroundColor: "#444C87" }
        : { color: "#293264", backgroundColor: "#D6DBF5" };
    }

   

    if (props.isAnswerChecked) {
      // Answer Buttons In Light Mode
      if (isSelected && isCorrect && !isDarkMode) {
        buttonStyle = { backgroundColor: "#94D7A2", color: "#293264" };
      } else if (!isSelected && isCorrect && !isDarkMode) {
        buttonStyle = { backgroundColor: "#94D7A2", color: "#293264" };
      } else if (isSelected && !isCorrect && !isDarkMode) {
        buttonStyle = { backgroundColor: "#F8BCBC", color: "#293264" };
      } else if (!isSelected && !isCorrect && !isDarkMode) {
        buttonStyle = {
          borderColor: "gary",
          backgroundColor: "transparent",
          color: "gray",
        };
      }

      // Answer Buttons In Dark Mode
      else if (isSelected && isCorrect && isDarkMode) {
        buttonStyle = { backgroundColor: "#1F6F57", color: "#ECECEC" };
      } else if (!isSelected && isCorrect && isDarkMode) {
        buttonStyle = { backgroundColor: "#1F6F57", color: "#ECECEC" };
      } else if (isSelected && !isCorrect && isDarkMode) {
        buttonStyle = { backgroundColor: "#8C3A3A", color: "#D9D9D9" };
      } else if (!isSelected && !isCorrect && isDarkMode) {
        buttonStyle = {
          borderColor: "gary",
          backgroundColor: "transparent",
          color: "gray",
        };
      }
    }

    const decodedAnswer =
      typeof answer === "string" ? he.decode(answer) : answer;

    return (
      <button
        className="answer-btn"
        key={index}
        onClick={() => selectAnswer(answer)}
        style={buttonStyle}
      >
        {decodedAnswer}
      </button>
    );
  });

  return (
    <div className="quiz-parent">
      <div className="quiz-sub-parent">
        <div className="quizing-section">
          <p className="questions">{decodedQuestion}</p>
          {/* <p>Correct Answer: {decodedCorrectAnswer}</p> */}
            {answerButtons}
        </div>
        <hr width="80%" style={hLineStyles}/>
      </div>
    </div>
  );
}

export default Quiz;