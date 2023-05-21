import React from 'react';
import { useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './App.css';

  function App() {
    const [questions, setQuestions] = useState([]);
    const [selectedCorrectAnswersLen, setSelectedCorrectAnswersLen] = useState ()
    const [isAnswerChecked, setIsAnswerChecked] = useState (false)
    const [isStartScreenShowing, setIsStartScreenShowing] = useState(true);
    const [areAnswersClickable, setAreAnswersClickable] = useState (true)


    const apiURL =
          'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple';

  function toggleStartScreen() {
    setIsStartScreenShowing(false);
    fetchData();
  }

  const choseNumOfQuestions = 
            <div> 
              <select name="difficulty" id="difficulty" form="difficultyform">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

  const choseDifficulty = 
            <div>
              <select name="num" id="num" form="numform">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>



  async function fetchData() {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const questionsWithId = data.results.map((question, index) => ({
        ...question,
        id: index,
        selectedAnswer: null,
      }));
        setQuestions(questionsWithId);
        setIsAnswerChecked(false);
        setSelectedCorrectAnswersLen(0);
        setAreAnswersClickable(true);
    } catch (error) {
        console.log('Error fetching data:', error);
      }
  }


  function selectAnswer(questionId, answer) {
    if (!areAnswersClickable) {
      return;
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((data) =>
        data.id === questionId ? { ...data, selectedAnswer: answer } : data
      )
    );
  }

  const quizElements = questions.map((quiz) => (
    <Quiz
      questionId={quiz.id}
      question={quiz.question}
      key={quiz.id}
      selectedAnswer={quiz.selectedAnswer}
      correctAnswer={quiz.correct_answer}
      incorrectAnswers={quiz.incorrect_answers}
      selectAnswer={(answer) => selectAnswer(quiz.id, answer)}
      isAnswerChecked={isAnswerChecked}
    />
  ));

  function resetQuiz() {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        selectedAnswer: null
      }))
    );
    setIsAnswerChecked(false);
    setSelectedCorrectAnswersLen(0);
    setAreAnswersClickable (true)
  }
  

  function mainMenu () {
    setIsStartScreenShowing (true)
    setQuestions ([])
  }

  function checkAnswersClick() {
    const selectedAnswers = questions.map((question) => question.selectedAnswer);
    const correctAnswers = questions.map((question) => question.correct_answer);
  
    let numOfCorrectAnswers = 0;
    const isAnswerCorrect  = []
    for (let i = 0; i < questions.length; i++) {
      if (correctAnswers[i] === selectedAnswers[i]) {
        numOfCorrectAnswers++;
        isAnswerCorrect.push (true)
      } else {
        isAnswerCorrect.push (false)
      }
    }
    setSelectedCorrectAnswersLen(numOfCorrectAnswers);
    setIsAnswerChecked (true)
    setAreAnswersClickable (false)
  }
  
  const checkAnswers = isAnswerChecked ? 
      <div className='div--answer-checked-btns'>
          <button className='btn--check-answer' onClick={resetQuiz}>
            Play Again
          </button>

          <button className='btn--check-answer' onClick={mainMenu}>
            Main Menu
          </button>
      </div>
      :
      <button className='btn--check-answer' onClick={checkAnswersClick}>
        Check Answers
      </button>
    
    const { width, height } = useWindowSize()

  return (
    <div className="App">                      
      {isStartScreenShowing && (   
        <div className='pakaya'>    
        <Start
          isStartScreenShowing={isStartScreenShowing}
          toggleStartScreen={toggleStartScreen}
          choseDifficulty={choseDifficulty} 
          choseNumOfQuestions={choseNumOfQuestions}
        />
        </div>     
        
      )}
                                               
      {!isStartScreenShowing && (
        <>
          
          {selectedCorrectAnswersLen === questions.length &&
            <
              Confetti
              width={width - 25}
              height={height * questions.length/3}
              numberOfPieces={400}
              gravity={.13}
            />
          }

          {quizElements}

          {isAnswerChecked && 
            <p>
              You Got {selectedCorrectAnswersLen} out of {questions.length}
            </p>
          }

          {checkAnswers}
        </>
      )}
    </div>
  );
}

export default App;