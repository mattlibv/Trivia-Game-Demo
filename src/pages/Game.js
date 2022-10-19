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
    const userConfig = JSON.parse(localStorage.getItem('userConfig'));
    const { category, difficulty, type } = userConfig;
    const link = `https://opentdb.com/api.php?amount=5&token=${token}`;
    if (category !== 'any') {
      link.concat(`&category=${category}`);
    }
    if (difficulty !== 'any') {
      link.concat(`&difficulty=${difficulty}`);
    }
    if (type !== 'any') {
      link.concat(`&type=${type}`);
    }
    const response = await fetch(link);
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

  resetClock = () => {
    const { time } = this.state;
    if (time === 0) {
      this.crono();
    }
  };

  handleQuestions = () => {
    const { inx, questions } = this.state;
    const { history } = this.props;
    const MAX_INX = 4;
    if (inx === MAX_INX) {
      history.push('/feedback');
      localStorage.setItem('userConfig', JSON.stringify({
        category: 'any',
        difficulty: 'any',
        type: 'any',
      }));
    }
    const nums = inx + 1;
    this.resetClock();
    this.setState({
      inx: nums,
      question: questions[nums],
      anwsered: false,
      btnDisable: false,
      time: 30,
      randomizor: Math.random(),
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

  decoder = (str) => {
    const element = document.createElement('div');
    function decodeHTMLEntities() {
      if (str && typeof str === 'string') {
        // limpa script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
      return str;
    }
    return decodeHTMLEntities();
  };

  render() {
    this.updateTimer();
    const { logged, question, anwsered, time,
      btnDisable, randomizor, questions } = this.state;
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
          <h4 className="timer">
            {`Tempo: ${time}s`}
          </h4>
          <div className="question">
            <h3 data-testid="question-category">{question.category}</h3>
            {questions.length
              && (
                <h4 data-testid="question-text">
                  { this.decoder(question.question) }
                </h4>
              )}
            <div data-testid="answer-options">
              {randomOptions.map((element, index) => {
                if (element === correctAnswer) {
                  return (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      className={ anwsered ? 'correctAnswer' : 'answer-btn' }
                      onClick={ this.handleChoice }
                      disabled={ btnDisable }
                      key={ index }
                    >
                      {this.decoder(element)}
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    key={ index }
                    data-testid={ `wrong-answer-${index}` }
                    className={ anwsered ? 'incorrectAnswer' : 'answer-btn' }
                    onClick={ this.handleChoice }
                    disabled={ btnDisable }
                  >
                    {this.decoder(element)}
                  </button>
                );
              }) }
              {anwsered
                ? (
                  <button
                    className="btn-next success"
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
