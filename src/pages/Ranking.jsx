import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRanking } from '../services/ranking';
import { saveScore } from '../redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = getRanking();
    console.log(ranking);
    this.setState({
      ranking: ranking.sort((a, b) => b.score - a.score),
    });
  }

  HandlerClick = () => {
    const { setUserScore, history } = this.props;
    setUserScore(0);
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
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
          onClick={ this.HandlerClick }
          data-testid="btn-go-home"
        >
          Play Again
        </button>
      </div>
    );
  }
}
// asdsaddasdsadw

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  setUserScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserScore: (score) => dispatch(saveScore(score)),
});

export default connect(null, mapDispatchToProps)(Ranking);
