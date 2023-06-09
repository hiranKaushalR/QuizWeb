import React from "react";
import { useState } from "react";
import Start from "./components/Start";
import Head from "./components/Head";
import Quiz from "./components/Quiz";
import { SyncLoader } from "react-spinners";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedCorrectAnswersLen, setSelectedCorrectAnswersLen] = useState();
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isStartScreenShowing, setIsStartScreenShowing] = useState(true);
  const [areAnswersClickable, setAreAnswersClickable] = useState(true);
  const [questionLen, setQuestionLen] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(9);
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [isTimerPlaying, setIsTimerPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  const apiURL = `https://opentdb.com/api.php?amount=${questionLen}&category=${category}&difficulty=${difficulty}&type=multiple`;

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
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
 
  function toggleStartScreen() {
    setIsStartScreenShowing(false);
    setIsTimerPlaying(true);
    setIsLoading(true);
    fetchData();
  }

  // Dark mode && Light mode coloring styles \\
  const bgStyle = {
    backgroundColor: isDarkMode ? "#031527" : "#F5F7FB",
    color: isDarkMode ? "#FFFFFF" : "#293264",
  };

  const btnStyles = {
    backgroundColor: isDarkMode ? "#26345D" : "#4D5B9E",
    color: isDarkMode ? "#E0E0E0" : "#FFFFFF",
  };

  const formStyle = {
    backgroundColor: isDarkMode ? "#194F61" : "#E3F1FA",
    color: isDarkMode ? "#ECECEC" : "#2f2d64",
  };

  const loadingColor = isDarkMode ? "#FFFFFF" : "#000000";


  //  JSX of selecting Category, Difficulty , Number of questions \\
  const choseCategory = (
    <div onChange={getCategory}>
      <select
        style={formStyle}
        className="select-form"
        name="category"
        id="category"
        form="categoryform"
      >
        <option value="9">General Knowledge</option>
        <option value="26">Celebrities</option>
        <option value="11">Movies</option>
        <option value="31">Anime & Manga</option>
        <option value="15">Video Games</option>
        <option value="12">Music</option>
        <option value="19">Mathematics</option>
        <option value="17">Science & Nature</option>
        <option value="20">Mythology</option>
        <option value="23">History</option>
        <option value="21">Sports</option>
        <option value="28">Vehicles</option>
      </select>
    </div>
  );

  const choseDifficulty = (
    <div onChange={getDifficulty}>
      <select
        style={formStyle}
        className="select-form"
        name="num"
        id="num"
        form="numform"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );


  const choseNumOfQuestions = (
    <div onChange={getLenOfQuestions}>
      <select
        style={formStyle}
        className="select-form"
        name="difficulty"
        id="difficulty"
        form="difficultyform"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );

  let selectedCategory = "General Knowledge";
  if (category === "9") {
    selectedCategory = "General Knowledge";
  } else if (category === "26") {
    selectedCategory = "celebrities";
  } else if (category === "11") {
    selectedCategory = "Movies";
  } else if (category === "31") {
    selectedCategory = "Anime & Manga";
  } else if (category === "15") {
    selectedCategory = "Video Games";
  } else if (category === "12") {
    selectedCategory = "Music";
  } else if (category === "19") {
    selectedCategory = "Mathematics";
  } else if (category === "17") {
    selectedCategory = "Science & Nature";
  } else if (category === "20") {
    selectedCategory = "Mythology";
  } else if (category === "23") {
    selectedCategory = "History";
  } else if (category === "21") {
    selectedCategory = "Sports";
  } else if (category === "28") {
    selectedCategory = "Vehicles";
  }

  // Getting the selected data from Forms \\
  function getLenOfQuestions(event) {
    setQuestionLen(event.target.value);
  }

  function getDifficulty(event) {
    setDifficulty(event.target.value);
  }

  function getCategory(event) {
    setCategory(event.target.value);
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

  function resetQuiz() {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        selectedAnswer: null,
      }))
    );
    setIsAnswerChecked(false);
    setSelectedCorrectAnswersLen(0);
    setAreAnswersClickable(true);
    setIsTimerPlaying(true);
    setKey((prevKey) => prevKey + 1);
  }

  function mainMenu() {
    setIsStartScreenShowing(true);
    setQuestions([]);
  }

  function checkAnswersClick() {
    const selectedAnswers = questions.map(
      (question) => question.selectedAnswer
    );
    const correctAnswers = questions.map((question) => question.correct_answer);

    let numOfCorrectAnswers = 0;
    const isAnswerCorrect = [];
    for (let i = 0; i < questions.length; i++) {
      if (correctAnswers[i] === selectedAnswers[i]) {
        numOfCorrectAnswers++;
        isAnswerCorrect.push(true);
      } else {
        isAnswerCorrect.push(false);
      }
    }
    setSelectedCorrectAnswersLen(numOfCorrectAnswers);
    setIsAnswerChecked(true);
    setAreAnswersClickable(false);
    setIsTimerPlaying(false);
  }

  const markAsPerecentage = Math.floor(
    (selectedCorrectAnswersLen / questions.length) * 100
  );

  const checkAnswers = isAnswerChecked ? (
    <div className="div--answer-checked-btns">
      <button
        style={btnStyles}
        className="btn--check-answer"
        onClick={resetQuiz}
      >
        Play Again
      </button>

      <button
        style={btnStyles}
        className="btn--check-answer"
        onClick={mainMenu}
      >
        Main Menu
      </button>
    </div>
  ) : (
    <button
      style={btnStyles}
      className="btn--check-answer"
      onClick={checkAnswersClick}
    >
      Check Answers
    </button>
  );

  const selectedAnswers = questions.map((ans) => ans.selectedAnswer);

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
      isDarkMode={isDarkMode}
    />
  ));

  return (
    <div className="App" style={bgStyle}>
      {isStartScreenShowing && (
        <div className="pakaya">
          <Start
            isStartScreenShowing={isStartScreenShowing}
            toggleStartScreen={toggleStartScreen}
            choseDifficulty={choseDifficulty}
            choseNumOfQuestions={choseNumOfQuestions}
            choseCategory={choseCategory}
            difficulty={difficulty}
            questionLen={questionLen}
            selectedCategory={selectedCategory}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>
      )}

      {!isStartScreenShowing && (
        <div>
          {isLoading ? (
            <div className="sync-loader">
              <SyncLoader color={loadingColor} />
            </div>
          ) : (
            <>
              <Head
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                key={key}
                checkAnswersClick={checkAnswersClick}
                isTimerPlaying={isTimerPlaying}
                selectedCategory={selectedCategory}
                difficulty={difficulty}
                questionLen={questionLen}
                selectedAnswers={selectedAnswers}
              />

              {quizElements}

              {isAnswerChecked && (
                <div className="marks">
                  <p className="correct-answers-in-number">
                    You Got {selectedCorrectAnswersLen} out of{" "}
                    {questions.length}
                  </p>
                  <p className="correct-answers-in-perecentage">
                    Your Marks: {markAsPerecentage} %
                  </p>
                </div>
              )}
              <div className="check-answer-btns">{checkAnswers}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
