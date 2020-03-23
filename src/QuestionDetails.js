import React from "react";

export default class QuestionDetails extends React.Component{
    render() {
        return(
            <div>
                <h2>Question</h2>
                <h3>{this.props.question.title}</h3>
                <textarea className="form-control"></textarea>
            </div>
        )
    }
}
