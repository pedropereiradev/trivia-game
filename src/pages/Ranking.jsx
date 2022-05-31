import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../services/ranking';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = getRanking();

    this.setState({
      ranking: ranking.sort((a, b) => b.score - a.score),
    });
  }

  render() {
    const { ranking } = this.state;
    const { history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {ranking.length > 0 && (
            ranking.map((player, index) => (
              <li key={ index }>
                <img
                  src={ player.picture }
                  alt={ `imagem de perfil de ${player.name} ` }
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  {player.name}
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  {player.score}
                </p>
              </li>
            ))
          )}
        </ol>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Ranking;
