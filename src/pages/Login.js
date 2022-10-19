import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { salvarEmail, reset } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    btnDisabled: true,
  };

  componentDidMount() {
    if (localStorage.getItem('userConfig') === null) {
      localStorage.setItem('userConfig', JSON.stringify({
        category: 'any',
        difficulty: 'any',
        type: 'any',
      }));
    }
  }

  checkLength = () => {
    const { email, name } = this.state;
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCheck = (Regex.test(email));
    if (email.length && name.length && emailCheck) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.checkLength());
  };

  onClickChange = async () => {
    const { history, resetInfo } = this.props;
    const { saveEmailToHash } = this.props;
    const { email, name } = this.state;
    resetInfo();
    saveEmailToHash(email, name);
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const token = await data.token;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { btnDisabled } = this.state;
    const { history } = this.props;
    return (
      <div className="loginForm-container">
        <form>
          <h1>Trivia Game 2.0 Turbo</h1>
          <fieldset className="flex two">
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                placeholder="Insira seu nome"
                name="name"
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                type="email"
                placeholder="Insira seu email"
                name="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
          </fieldset>
          <hr />
          <fieldset className="flex one">
            <button
              type="button"
              className="warning"
              data-testid="btn-settings"
              onClick={ () => history.push('/config') }
            >
              Configurar
            </button>
            <button
              type="button"
              className="success"
              disabled={ btnDisabled }
              data-testid="btn-play"
              onClick={ this.onClickChange }
            >
              Play
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveEmailToHash: (email, name) => dispatch(salvarEmail(email, name)),
    resetInfo: () => dispatch(reset()),
  };
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveEmailToHash: PropTypes.func,
  resetInfo: PropTypes.func,
}.isRequired;
