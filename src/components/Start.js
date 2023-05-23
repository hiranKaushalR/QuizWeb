import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import './style.css'



function Start (props) {

    // Dark mode and colorind settings
    const bgTextStyles = {
        backgroundColor: props.isDarkMode ? '#001219' : '#FFFFFF',
        color: props.isDarkMode ? '#D3D3D3' : '#293264'
    }

    const btnStyles = {
        backgroundColor: props.isDarkMode ? '#D3D3D3' : '#FFFFFF',
        color: props.isDarkMode ? '#001219' : '#293264'
    }



    


    return (
        <>
        <div className="start-screen" style={bgTextStyles}>

            <DarkModeToggle 
                checked={props.isDarkMode} 
                onChange={props.setIsDarkMode} 
                size={60}
                speed={2.5}
            />
            

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
                    <button style={btnStyles} onClick={props.toggleStartScreen} className="start-screen--btn">Start Quiz</button>
                </div>

            </div>

        </div>
        </>
    )
}

export default Start