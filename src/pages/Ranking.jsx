import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Ranking;
