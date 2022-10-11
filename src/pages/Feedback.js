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

  render() {
    const { wellDone } = this.state;
    return (
      <h5 data-testid="feedback-text">
        {wellDone ? 'Well Done!' : 'Could be better...'}
      </h5>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  player: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
