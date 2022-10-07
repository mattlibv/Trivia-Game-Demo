import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    btnDisabled: true,
  };

  checkLength = () => {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
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
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const token = await data.token;
    localStorage.setItem('token', token);
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <form>
        <input
          type="text"
          placeholder="Insira seu nome"
          name="name"
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <input
          type="email"
          placeholder="Insira seu email"
          name="email"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <Link to="/game">
          <button
            type="button"
            disabled={ btnDisabled }
            data-testid="btn-play"
            onClick={ this.onClickChange }
          >
            Play
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
