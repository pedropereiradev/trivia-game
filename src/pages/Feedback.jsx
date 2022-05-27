import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    // const MIN_ASSERTIONS = 3;

    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          teste
          {/* {assertions >= MIN_ASSERTIONS ? 'Well Done!' : 'Could be better...'} */}
        </h2>

        {/* <section> */}
        {/* <p> */}
        {/* Você acertou */}
        {/* {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' '}
            {assertions === 1 ? 'questão' : 'questões'}
            {' '} */}
        {/* ! */}
        {/* </p>
          <p>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            {score === 1 ? 'ponto' : 'pontos'} */}
        {/* </p> */}
        {/* </section> */}
        <section>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={ () => history.push('/ranking') }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  // assertions: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Feedback);
