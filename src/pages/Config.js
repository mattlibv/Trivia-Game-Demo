import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Config extends Component {
  state = {
    category: 'any',
    difficulty: 'any',
    type: 'any',
  };

  componentDidMount() {
    const localStorageObj = JSON.parse(localStorage.getItem('userConfig'));
    this.setState({
      ...localStorageObj,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    localStorage.setItem('userConfig', JSON.stringify({
      ...this.state,
    }));
    history.push('/');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { category, difficulty, type } = this.state;
    return (
      <div>
        <h2 data-testid="settings-title">Configurar</h2>
        <form>
          <label htmlFor="category">
            Categoria
            <br />
            <select name="category" value={ category } onChange={ this.handleChange }>
              <option value="any">Qualquer</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>
          <br />
          <label htmlFor="difficulty">
            Dificuldade
            <br />
            <select name="difficulty" value={ difficulty } onChange={ this.handleChange }>
              <option value="any">Qualquer</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <br />
          <label htmlFor="type">
            Tipo
            <br />
            <select name="type" value={ type } onChange={ this.handleChange }>
              <option value="any">Qualquer</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <br />
          <button type="submit" onClick={ this.handleClick }>Salvar</button>
        </form>
      </div>
    );
  }
}

Config.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
