import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { salvarEmail } from '../redux/actions';

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
    const { history } = this.props;
    const { saveEmailToHash } = this.props;
    const { email, name } = this.state;
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configurar
        </button>
        <button
          type="button"
          disabled={ btnDisabled }
          data-testid="btn-play"
          onClick={ this.onClickChange }
        >
          Play
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveEmailToHash: (email, name) => dispatch(salvarEmail(email, name)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveEmailToHash: PropTypes.func.isRequired,
};
