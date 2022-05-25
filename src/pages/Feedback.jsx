import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const MIN_SCORE = 3;
    const { score } = this.props;

    return (
      <div>
        {/* Header */}

        <h2 data-testid="feedback-text">
          {score > MIN_SCORE ? 'Well Done!' : 'Could be better...'}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.playerReducer.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
