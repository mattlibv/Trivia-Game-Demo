import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { hash, name } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" alt="avatar" src={ `https://www.gravatar.com/avatar/${hash}` } />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.saveHash.hash,
  name: state.saveHash.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
