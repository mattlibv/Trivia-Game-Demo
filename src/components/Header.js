import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { hash, name, getPoints } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" alt="avatar" src={ `https://www.gravatar.com/avatar/${hash}` } />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ getPoints }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.player.hash,
  name: state.player.name,
  getPoints: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getPoints: PropTypes.number.isRequired,
};
