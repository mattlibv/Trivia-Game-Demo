import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  }

  displayRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { wellDone } = this.state;
    const { assertions, score } = this.props;
    return (
      <div>
        <h5 data-testid="feedback-text">
          {wellDone ? 'Well Done!' : 'Could be better...'}
        </h5>
        ;
        <h5 data-testid="feedback-total-score">
          {' '}
          {score}
          {' '}
        </h5>
        <h5 data-testid="feedback-total-question">
          {' '}
          {assertions}
          {' '}
        </h5>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.displayRanking }
        >
          Ranking
        </button>
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
