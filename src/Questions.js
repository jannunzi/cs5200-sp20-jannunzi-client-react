import React from "react";
import QuestionDetails from "./QuestionDetails";

export default class Questions extends React.Component {
    state = {
        quiz: {
            _id: '',
            title: '',
            questions: [],
            questionsAggregation: [],
            questionsComposition: [],
            questionsEmbedded: []
        },
        newQuestion: {
            title: ''
        },
        selectedQuestion: null
    }
    componentDidMount() {
        // this.setState({
        //     quiz: this.props.quiz
        // })
        // this.findAllQuestions()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.quiz._id !== this.props.quiz._id) {
            this.setState({
                quiz: this.props.quiz
            })
        }
    }

    deleteQuestion = (quizId, questionId) =>
        fetch(`http://localhost:4000/api/quizzes/${quizId}/questions/${questionId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(quiz => this.setState({
                quiz: quiz
            }))

    createQuestion = (quizId, question) =>
        fetch(`http://localhost:4000/api/quizzes/${quizId}/questions`, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(quiz => this.setState({
                quiz: quiz,
                newQuestion: {
                    title: ''
                }
            }))

    selectQuestion = (question) =>
        this.setState({
            selectedQuestion: question
        })

    render() {
        return(
            <div>
                <h2>Questions</h2>
                <input
                    className="form-control"
                    placeholder="Question Title"
                    onChange={(event) => this.setState({
                        newQuestion: {
                            title: event.target.value
                        }
                    })}
                    value={this.state.newQuestion.title}/>
                <button
                    className="btn btn-block btn-primary"
                    onClick={() => this.createQuestion(this.state.quiz._id, this.state.newQuestion)}>
                    Create Question
                </button>
                <br/>
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-success">
                                Aggregate
                            </li>
                            {
                                this.state.quiz.questionsAggregation
                                    .map(question =>
                                        <li onClick={() => this.selectQuestion(question)}
                                            className={`list-group-item ${this.state.selectedQuestion === question ? 'list-group-item-warning':''}`}
                                            key={question._id}>
                                            <button
                                                className="btn btn-danger float-right"
                                                onClick={() =>
                                                    this.deleteQuestion(this.state.quiz._id, question._id)}>
                                                Delete
                                            </button>
                                            {question.title}
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-success">
                                Composition
                            </li>
                            {
                                this.state.quiz.questionsComposition
                                    .map(question =>
                                        <li onClick={() => this.selectQuestion(question)}
                                            className={`list-group-item ${this.state.selectedQuestion === question ? 'list-group-item-warning':''}`}
                                            key={question._id}>
                                            <button
                                                className="btn btn-danger float-right"
                                                onClick={() =>
                                                    this.deleteQuestion(this.state.quiz._id, question._id)}>
                                                Delete
                                            </button>
                                            {question.title}
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-success">
                                Embedded
                            </li>
                            {
                                this.state.quiz.questionsEmbedded
                                    .map(question =>
                                        <li onClick={() => this.selectQuestion(question)}
                                            className={`list-group-item ${this.state.selectedQuestion === question ? 'list-group-item-warning':''}`}
                                            key={question._id}>
                                            <button
                                                className="btn btn-danger float-right"
                                                onClick={() =>
                                                    this.deleteQuestion(this.state.quiz._id, question._id)}>
                                                Delete
                                            </button>
                                            {question.title}
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                </div>
                {
                    this.state.selectedQuestion &&
                    <QuestionDetails question={this.state.selectedQuestion}/>
                }
            </div>
        )
    }
}
