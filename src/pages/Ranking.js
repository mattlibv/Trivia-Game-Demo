import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Ranking.css';

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
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <hr />
        <div className="restart-container">
          <button
            type="button"
            className="restart success"
            data-testid="btn-go-home"
            onClick={ this.atualizar }
          >
            Tela Inicial
          </button>
        </div>
        <div className="c">
          { sortedArray.map((person, index) => (
            <div key={ index } className="card ranking-container">
              <img src={ person.picture } alt={ person.name } className="avatar" />
              <h4
                data-testid={ `player-name-${index}` }
                className="ranking-txt"
              >
                { `Jogador(a): ${person.name}` }
              </h4>
              <h4
                data-testid={ `player-score-${index}` }
                className="ranking-txt"
              >
                { `Pontuação: ${person.score}` }
              </h4>
              <h3>{`Posição: ${index + 1}º`}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
