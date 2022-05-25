import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const MIN_ASSERTIONS = 3;
    const { assertions } = this.props;

    return (
      <div>
        {/* Header */}

        <h2 data-testid="feedback-text">
          {assertions >= MIN_ASSERTIONS ? 'Well Done!' : 'Could be better...'}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
