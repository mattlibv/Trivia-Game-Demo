import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends React.Component {
  state = {
    wellDone: false,
  };

  componentDidMount() {
    const { player: { assertions } } = this.props;
    const THREE = 3;
    if (assertions >= THREE) {
      this.setState({ wellDone: true });
    }
    this.configLocalStorage();
  }

  configLocalStorage = () => {
    const { player: { name, score, hash } } = this.props;
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([{
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${hash}`,
      }]));
    } else {
      const oldArray = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...oldArray, {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${hash}`,
      }]));
    }
  };

  displayRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  restartGame = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { wellDone } = this.state;
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <div className="feedback card">
          <h3 data-testid="feedback-text" style={ { fontWeight: '900' } }>
            {wellDone ? 'Well Done!' : 'Could be better...'}
          </h3>
          <h4 data-testid="feedback-total-score">
            {`Sua pontuação: ${score}`}
          </h4>
          <h4 data-testid="feedback-total-question">
            {`Número de acertos: ${assertions}`}
          </h4>
        </div>
        <div className="ranking-btns">
          <button
            type="button"
            className="error"
            data-testid="btn-ranking"
            onClick={ this.displayRanking }
          >
            Ranking
          </button>
          <button
            type="button"
            className="success"
            data-testid="btn-play-again"
            onClick={ this.restartGame }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  player: PropTypes.object,
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
