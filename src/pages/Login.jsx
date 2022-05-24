import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  validate = () => {
    const { name, email } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_NAME_LENGTH = 0;
    const validation = [name.length > MIN_NAME_LENGTH && regex.test(email)];
    this.setState({
      isDisabled: !validation.every((element) => element === true),
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  handleClick = (event) => {
    event.preventDefault();
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          placeholder="Insira seu nome"
          value={ name }
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <input
          type="email"
          name="email"
          placeholder="Insira seu e-mail"
          value={ email }
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClick }
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
