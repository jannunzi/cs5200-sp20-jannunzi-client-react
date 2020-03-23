import React from "react";

export default class Quizzes extends React.Component {
    state = {
        quizzes: [],
        newQuiz: {
            title: ''
        },
        selectedQuiz: {

        }
    }
    componentDidMount() {
        this.findAllQuizzes()
    }
    findAllQuizzes = () =>
        fetch("http://localhost:4000/api/quizzes")
            .then(response => response.json())
            .then(allQuizzes => this.setState({
                quizzes: allQuizzes
            }))
    deleteQuiz = (quizId) =>
        fetch(`http://localhost:4000/api/quizzes/${quizId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(status => this.setState(prevState => ({
                quizzes: prevState.quizzes.filter(quiz => quiz._id !== quizId)
            })))
    createQuiz = (quiz) =>
        fetch("http://localhost:4000/api/quizzes", {
            method: 'POST',
            body: JSON.stringify(quiz),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(newQuiz => this.setState(prevState => ({
                quizzes: [...prevState.quizzes, newQuiz],
                newQuiz: {title: ''}
            })))
    selectQuiz = (quiz) => {
        this.props.selectQuiz(quiz)
        this.setState({
            selectedQuiz: quiz
        })
    }

    render() {
        return(
            <div>
                <h2>Quizzes</h2>
                {this.state.selectedQuizId}
                <ul className="list-group">
                    <li className="list-group-item">
                        <input
                            className="form-control"
                            placeholder="Quiz Title"
                            onChange={(event) => this.setState({
                                newQuiz: {
                                    title: event.target.value
                                }
                            })}
                            value={this.state.newQuiz.title}/>
                        <button
                            className="btn btn-block btn-primary"
                            onClick={() => this.createQuiz(this.state.newQuiz)}>
                            Create Quiz
                        </button>
                    </li>
                    {
                        this.state.quizzes
                            .map(quiz =>
                                <li onClick={() => this.selectQuiz(quiz)}
                                    className={`list-group-item ${this.state.selectedQuiz === quiz ? 'list-group-item-warning':''}`} key={quiz._id}>
                                    <button
                                        className="btn btn-danger float-right"
                                        onClick={() => this.deleteQuiz(quiz._id)}>
                                        Delete
                                    </button>
                                    {quiz.title}
                                </li>
                            )
                    }
                </ul>
            </div>
        )
    }
}
