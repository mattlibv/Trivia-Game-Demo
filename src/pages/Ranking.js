import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.atualizar = this.atualizar.bind(this);
  }

  atualizar = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const peopleRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortedArray = peopleRanking.sort((a, b) => b.score - a.score);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { sortedArray.map((person, index) => (
            <div key={ index }>
              <img src={ person.picture } alt={ person.name } />
              <h4 data-testid={ `player-name-${index}` }>{ person.name }</h4>
              <h4 data-testid={ `player-score-${index}` }>{ person.score }</h4>
            </div>
          ))}
        </div>
        <button type="button" data-testid="btn-go-home" onClick={ this.atualizar }>
          Tela Inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
