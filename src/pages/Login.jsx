import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveUserEmail, saveUserName } from '../redux/actions';
import { fetchApiPlayer } from '../services/triviaAPI';
import { saveToken } from '../services/ranking';

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
    const validation = name.length > MIN_NAME_LENGTH && regex.test(email);
    this.setState({ isDisabled: !validation });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  handleClick = async (event) => {
    event.preventDefault();

    const { history, setUserEmail, setUserName } = this.props;
    const { email, name } = this.state;

    const token = await fetchApiPlayer();

    saveToken(token);
    setUserName(name);
    setUserEmail(email);

    history.push('/game');
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

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            {' '}
            Settings

          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  setUserEmail: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(saveUserEmail(email)),
  setUserName: (name) => dispatch(saveUserName(name)),
});

export default connect(null, mapDispatchToProps)(Login);
