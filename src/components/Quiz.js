import React from "react";
import { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const he = require('he');


function Quiz(props) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
  
    const answers = [...props.incorrectAnswers];
    const correctAnswer = props.correctAnswer;
  
    useEffect(() => {
      const shuffled = [...answers];
      const ranNumForAnswerMix = Math.floor(Math.random() * (answers.length + 1));
      shuffled.splice(ranNumForAnswerMix, 0, correctAnswer);
      setShuffledAnswers(shuffled);
    }, []);
  
    const decodedQuestion = typeof props.question === 'string' ? he.decode(props.question) : props.question;
    const decodedCorrectAnswer = typeof correctAnswer === 'string' ? he.decode(correctAnswer) : correctAnswer;
  
    const selectAnswer = (answer) => {
      props.selectAnswer(answer);
    };
  
    const answerButtons = shuffledAnswers.map((answer, index) => {
      const isSelected = answer === props.selectedAnswer;
      const isCorrect = answer === props.correctAnswer

      let buttonStyle =  {
        color: isSelected ? 'white' : 'black',
        backgroundColor: isSelected ? 'blue' : 'transparent',
      } 
      if (props.isAnswerChecked) {
        if (isSelected && isCorrect) {
          buttonStyle = {backgroundColor: 'green', color: 'white'};
        } else if (!isSelected && isCorrect) {
          buttonStyle = {backgroundColor: 'green', color: 'white'};
        } else if (isSelected && !isCorrect) {
          buttonStyle = {backgroundColor: 'red', color: 'white'};
        }
      }
      
  
      const decodedAnswer = typeof answer === 'string' ? he.decode(answer) : answer;
  
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
         
        <div>
          <p>{decodedQuestion}</p>
          {/* <p>Correct Answer: {decodedCorrectAnswer}</p> */}
          {answerButtons}
          
        </div>
      </div>
    );
  }
  
  export default Quiz;