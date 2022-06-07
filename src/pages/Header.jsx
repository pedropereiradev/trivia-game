import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const convert = MD5(gravatarEmail).toString();

    return (
      <div
        className="border-bottom border-white border-opacity-10 d-flex align-items-center
        justify-content-between bg-dark text-white px-4 py-1 fs-2 text"
      >
        <section className="d-flex align-items-center">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${convert}` }
            alt="off symbol"
            className="me-4 rounded"
          />
          <p data-testid="header-player-name">{`Jogador(a): ${name}`}</p>
        </section>
        <p>
          Pontos:
          {' '}
          <span data-testid="header-score">{score}</span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
