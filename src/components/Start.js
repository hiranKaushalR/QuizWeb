import React from "react";
import './style.css'


function Start (props) {


    return (
        <div className="start-screen">
            

            <div className="start-screen--parent">

                <div className="start-screen--sub-parent">
                    

                    <h1 className="start-screen--topic">Quizzical</h1>
                    <form className="form">
                        {props.choseCategory}
                        {props.choseDifficulty}
                        {props.choseNumOfQuestions}

                    </form>
                    
                    <p className="start-screen--sub-topic">

                        You will be asked {props.questionLen} {props.difficulty} level questions about {props.selectedCategory}

                    </p>
                    <button onClick={props.toggleStartScreen} className="start-screen--btn">Start Quiz</button>
                    
                </div>

            </div>

        </div>
    )
}

export default Start