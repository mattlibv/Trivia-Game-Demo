import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    logged: true,
    question: {
      incorrect_answers: [],
      correct_answer: [],
    },
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
  }

  render() {
    const { logged, question } = this.state;
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
      <Header />
      <div className="game-container">
        <div className="question">
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
          <div data-testid="answer-options">
            { randomOptions.map((element, index) => {
              if (element === correctAnswer) {
                return (
                  <button type="button" data-testid="correct-answer">
                    { element }
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `wrong-answer-${index}` }
                >
                  { element }
                </button>
              );
            }) }
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
