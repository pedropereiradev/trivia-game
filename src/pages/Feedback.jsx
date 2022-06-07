import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from './Header';
import { saveNewGame } from '../services/ranking';

class Feedback extends Component {
  render() {
    const { history, assertions, score, name, gravatarEmail } = this.props;
    const MIN_ASSERTIONS = 3;

    const encriptedEmail = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${encriptedEmail}`;

    saveNewGame({ name, score, picture });

    return (
      <div className="bg-dark text-white vh-100">
        <Header />
        <h1
          className="mb-5"
          data-testid="feedback-text"
        >
          {assertions >= MIN_ASSERTIONS ? 'Well Done!' : 'Could be better...'}
        </h1>

        <section>
          <h2>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' '}
            {assertions === 1 ? 'questão' : 'questões'}
            !
          </h2>
          <h2>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
            {' '}
            pontos
          </h2>
        </section>
        <section className="d-grid gap-2 col-6 mx-auto mt-5">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
            className="btn btn-primary"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={ () => history.push('/ranking') }
            data-testid="btn-ranking"
            className="btn btn-secondary"
          >
            Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Feedback);
