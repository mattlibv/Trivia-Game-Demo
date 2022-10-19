import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { hash, name, getPoints } = this.props;
    return (
      <div className="header-container">
        <div className="flex three">
          <img
            className="avatar"
            data-testid="header-profile-picture"
            alt="avatarr"
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
          <h3 data-testid="header-player-name">{`Jogador: ${name}`}</h3>
          <h3 data-testid="header-score">{`Pontuação: ${getPoints}`}</h3>
        </div>
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
