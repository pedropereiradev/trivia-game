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
      <div className="bg-dark text-white min-vh-100 h-100 p-5">
        <h1 data-testid="ranking-title">Ranking</h1>
        <section className="border border-white border-opacity-10 p-2 h-50">
          <ol className="d-flex flex-wrap">
            {ranking.length > 0 && (
              ranking.map((player, index) => (
                <li
                  className="mb-3 mx-3 w-100 d-flex align-items-center
                  border-bottom border-white border-opacity-10 pb-3"
                  key={ index }
                >
                  <img
                    src={ player.picture }
                    alt={ `imagem de perfil de ${player.name} ` }
                    className="rounded"
                  />
                  <p
                    data-testid={ `player-name-${index}` }
                    className="mx-4 fs-2 text"
                  >
                    {player.name}
                  </p>
                  <p
                    data-testid={ `player-score-${index}` }
                    className="fs-2 text"
                  >
                    {player.score}
                  </p>
                </li>
              ))
            )}
          </ol>
        </section>
        <button
          type="button"
          onClick={ () => history.push('/') }
          className="btn btn-primary mt-3"
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
