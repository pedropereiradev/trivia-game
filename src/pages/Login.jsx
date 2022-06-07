import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAssertions,
  saveScore, saveUserEmail, saveUserName,
  setTriviaSettingsCategory, setTriviaSettingsDifficulty, setTriviaSettingsType,
} from '../redux/actions';
import { fetchApiPlayer } from '../services/triviaAPI';
import { saveToken } from '../services/ranking';

import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  componentDidMount() {
    const {
      clearScore, clearAssertions, clearCategory, clearDifficulty, clearType,
    } = this.props;

    clearAssertions();
    clearScore();
    clearCategory();
    clearDifficulty();
    clearType();
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
    const { history } = this.props;
    return (
      <div className="bg-dark vh-100">
        <section
          className="vh-100 d-flex flex-column justify-content-center align-items-center"
        >
          <img src={ logo } className="App-logo mb-5" alt="logo" />
          <form>
            <input
              type="text"
              name="name"
              placeholder="Insira seu nome"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
              className="form-control mb-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              className="form-control mb-3"
            />
            <section className="d-flex justify-content-between px-3">
              <button
                type="submit"
                disabled={ isDisabled }
                onClick={ this.handleClick }
                data-testid="btn-play"
                className="btn btn-primary px-4"
              >
                Play
              </button>

              <button
                type="button"
                onClick={ () => history.push('/settings') }
                data-testid="btn-settings"
                className="btn btn-secondary"
              >
                Settings
              </button>
            </section>

          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  setUserEmail: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  clearScore: PropTypes.func.isRequired,
  clearAssertions: PropTypes.func.isRequired,
  clearCategory: PropTypes.func.isRequired,
  clearDifficulty: PropTypes.func.isRequired,
  clearType: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(saveUserEmail(email)),
  setUserName: (name) => dispatch(saveUserName(name)),
  clearScore: (score = 0) => dispatch(saveScore(score)),
  clearAssertions: (assertions = 0) => dispatch(getAssertions(assertions)),
  clearCategory: () => dispatch(setTriviaSettingsCategory('')),
  clearDifficulty: () => dispatch(setTriviaSettingsDifficulty('')),
  clearType: () => dispatch(setTriviaSettingsType('')),
});

export default connect(null, mapDispatchToProps)(Login);
