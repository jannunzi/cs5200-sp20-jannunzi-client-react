import React from "react";
import Quizzes from "./Quizzes";
import Questions from "./Questions";

export default class WhiteBoard extends React.Component {
    state = {
        selectedQuiz: {}
    }
    selectQuiz = (quiz) =>
        this.setState({
            selectedQuiz: quiz
        })
    render() {
        return (
            <div>
                <h1>WhiteBoard App</h1>
                <div className="row">
                    <div className="col-3">
                        <Quizzes selectQuiz={this.selectQuiz}/>
                    </div>
                    <div className="col">
                        <Questions quiz={this.state.selectedQuiz}/>
                    </div>
                </div>
            </div>
        );
    }
}
