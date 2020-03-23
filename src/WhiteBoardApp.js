import React from "react";

export default class WhiteBoardApp extends React.Component {
    state = {
        quizzes: [],
        newQuiz: {
            title: ''
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


    createQuiz = (quiz) =>
        fetch("http://localhost:4000/api/quizzes", {
            method: 'POST',
            body: JSON.stringify(quiz),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(newQuiz => {})



    render() {
        return(
            <div>
                <h1>WhiteBoard App</h1>
                <h2>Quizzes</h2>
                <input
                    onChange={(event) => this.setState({
                        newQuiz: {
                            title: event.target.value
                        }
                    })}
                    value={this.state.newQuiz.title}/>
                <br/>
                <button onClick={() => this.createQuiz(this.state.newQuiz)}>
                    Create Quiz
                </button>
                <ul>
                    {
                        this.state.quizzes
                            .map(quiz =>
                                <li key={quiz._id}>
                                    {quiz.title}
                                </li>
                            )
                    }
                </ul>
            </div>
        )
    }
}
