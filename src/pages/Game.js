import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Game.css';

class Game extends React.Component {
  state = {
    logged: true,
    question: {
      incorrect_answers: [],
      correct_answer: [],
    },
    anwsered: false,
    time: 30,
    btnDisable: false,
    ids: 0,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.response_code === Number('3')) {
      this.setState({
        logged: false,
      });
    }
    if (data.response_code === 0) {
      this.setState({
        logged: true,
        question: data.results[0],
      });
    }
    this.crono();
  }

  crono = () => {
    const func = () => this.setState((state) => ({
      time: state.time - 1,
    }));
    const ids = setInterval(() => func(), Number('1000'));
    this.setState({ ids });
  };

  handleChoice = () => {
    this.setState({
      anwsered: true,
    });
  };

  updateTimer = () => {
    const { time, ids } = this.state;
    if (time === 1) {
      clearTimeout(ids);
      this.setState({ btnDisable: true });
    }
  };

  render() {
    this.updateTimer();
    const { logged, question, anwsered, time, btnDisable } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = question;
    const { history } = this.props;
    const options = [...incorrectAnswers, correctAnswer];
    const dot5 = 0.5;
    const randomOptions = options.sort(() => Math.random() - dot5);
    if (!logged) {
      localStorage.clear();
      history.push('/');
    }
    return (
      <>
        <Header />
        <div className="game-container">
          <p>{time}</p>
          <div className="question">
            <h3 data-testid="question-category">{question.category}</h3>
            <h4 data-testid="question-text">{question.question}</h4>
            <div data-testid="answer-options">
              {randomOptions.map((element, index) => {
                if (element === correctAnswer) {
                  return (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      className={ anwsered ? 'correctAnswer' : undefined }
                      onClick={ this.handleChoice }
                      disabled={ btnDisable }
                    >
                      {element}
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    key={ index }
                    data-testid={ `wrong-answer-${index}` }
                    className={ anwsered ? 'incorrectAnswer' : undefined }
                    onClick={ this.handleChoice }
                    disabled={ btnDisable }
                  >
                    {element}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
