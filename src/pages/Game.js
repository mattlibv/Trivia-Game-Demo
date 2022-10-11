import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { savePoints } from '../redux/actions';
import Header from '../components/Header';
import '../styles/Game.css';

class Game extends React.Component {
  state = {
    logged: true,
    question: {
      incorrect_answers: [],
      correct_answer: [],
    },
    inx: 0,
    questions: [],
    anwsered: false,
    time: 30,
    btnDisable: false,
    ids: 0,
    randomizor: Math.random(),
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
        questions: [...data.results],
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

  handleQuestions = () => {
    const { inx, questions } = this.state;
    const { history } = this.props;
    const MAX_INX = 4;
    if (inx === MAX_INX) {
      history.push('/feedback');
    }
    const nums = inx + 1;
    this.setState({
      inx: nums,
      question: questions[nums],
      anwsered: false,
      time: 30,
    });
  };

  handleChoice = ({ target }) => {
    const { question, time } = this.state;
    const { savePointsAndAssertions } = this.props;
    this.setState({
      anwsered: true,
    }, () => {
      const diffCoef = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      if (target.className === 'correctAnswer') {
        const POINT_COEF = 10;
        savePointsAndAssertions(POINT_COEF + (time * diffCoef[question.difficulty]));
      }
    });
  };

  updateTimer = () => {
    const { time, ids } = this.state;
    if (time === 0) {
      clearTimeout(ids);
      this.setState({
        btnDisable: true,
        anwsered: true,
      });
    }
  };

  render() {
    this.updateTimer();
    const { logged, question, anwsered, time, btnDisable, randomizor } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = question;
    const { history } = this.props;
    const options = [...incorrectAnswers, correctAnswer];
    const dot5 = 0.5;
    const randomOptions = options.sort(() => randomizor - dot5);
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
                      key={ index }
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
              }) }
              {anwsered
                ? (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleQuestions }
                  >
                    Next
                  </button>
                ) : null}

            </div>
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  savePointsAndAssertions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savePointsAndAssertions: (score) => dispatch(savePoints(score)),
});

export default connect(null, mapDispatchToProps)(Game);
