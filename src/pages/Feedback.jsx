import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;

    return (
      <div>
        {/* Header */}      
        <h2 data-testid="feedback-text">
          {assertions >= MIN_ASSERTIONS ? 'Well Done!' : 'Could be better...'}
        </h2>

        <section>
          <p>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' '}
            {assertions === 1 ? 'questão' : 'questões'}
            {' '}
            !
          </p>
          <p>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            {score === 1 ? 'ponto' : 'pontos'}
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
  score: state.playerReducer.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
