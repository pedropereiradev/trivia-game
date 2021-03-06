import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { getAssertions, saveScore } from '../redux/actions';
import { getToken, saveToken } from '../services/ranking';
import { fetchApiGame } from '../services/triviaAPI';

const he = require('he');

class Game extends Component {
  constructor() {
    super();
    this.state = {
      getQuestions: [],
      shuffledArray: [],
      rightAnswer: [],
      assertions: 0,
      position: 0,
      counter: 30,
      score: 0,
      correctBorder: '',
      incorrectBorder: '',
      isAnswered: false,
    };
  }

  timer = () => {
    const ONE_SECOND = 1000;

    this.intervalId = setInterval(() => {
      this.setState(({ counter }) => ({
        counter: counter - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidMount = async () => {
    const { history, settingsToApi } = this.props;

    const token = getToken();
    const questions = await fetchApiGame(token, settingsToApi);

    if (questions && questions.length > 0) {
      this.setState({
        getQuestions: questions,
      }, () => {
        const { getQuestions } = this.state;
        const NUMBER_SHUFFLED = 0.5;

        getQuestions.map((questionObj) => (
          this.setState((prevState) => ({
            shuffledArray: [...prevState.shuffledArray, [questionObj
              .correct_answer, ...questionObj.incorrect_answers]
              .sort(() => Math.random() - NUMBER_SHUFFLED)],
            rightAnswer: [...prevState.rightAnswer, questionObj.correct_answer],
          }))));
      });
    } else {
      history.push('/');
      saveToken();
    }

    this.timer();
  }

  handleClickNext = () => {
    const { getQuestions, position } = this.state;
    const { history } = this.props;

    this.timer();

    if (position >= getQuestions.length - 1) {
      history.push('/feedback');
    }

    this.setState((previousState) => ({
      position: previousState.position + 1,
      correctBorder: '',
      incorrectBorder: '',
      counter: 30,
    }));
  }

  multDifficulty = (getDifficulty) => {
    const THREE = 3;
    switch (getDifficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return THREE;
    default:
      return 1;
    }
  };

  handleClickOption = ({ target }) => {
    clearInterval(this.intervalId);

    const { getQuestions, counter, score, position } = this.state;
    const { setUserScore } = this.props;

    const actualQuestion = getQuestions[position];
    const question = target.innerHTML;

    if (actualQuestion.correct_answer === question) {
      const getDifficulty = actualQuestion.difficulty;
      const TEN = 10;
      const totalScore = score + TEN + (counter * this.multDifficulty(getDifficulty));

      this.setState(({ assertions }) => ({
        score: totalScore,
        assertions: assertions + 1,
      }), () => {
        const { setAssertions } = this.props;
        const { assertions } = this.state;

        setAssertions(assertions);
      });

      setUserScore(totalScore);
    }

    this.setState({
      correctBorder: '3px solid rgb(6, 240, 15)',
      incorrectBorder: '3px solid red',
      isAnswered: true,
    });
  };

  render() {
    const { getQuestions, position, correctBorder, incorrectBorder,
      isAnswered, counter, rightAnswer, shuffledArray } = this.state;
    const TIME_ENDING = 5;

    if (counter === 0) clearInterval(this.intervalId);

    return (
      <div className="bg-dark text-white min-vh-100">
        <Header />
        <h1
          className={ counter <= TIME_ENDING && 'text-danger' }
        >
          {`Timer: ${counter} `}
        </h1>

        <p
          className="mt-5"
          data-testid="question-category"
        >
          {getQuestions.length > 0
          && getQuestions[position].category}
        </p>

        <h2 data-testid="question-text">
          {getQuestions.length > 0
          && he.decode(getQuestions[position].question)}
        </h2>

        <section data-testid="answer-options">
          {shuffledArray.length > 0
              && shuffledArray[position].map((questions, index) => (
                <button
                  key={ index }
                  data-testid={ questions === rightAnswer[position]
                    ? 'correct-answer' : `wrong-answer-${index}` }
                  type="button"
                  onClick={ this.handleClickOption }
                  style={ questions === rightAnswer[position]
                    ? { border: correctBorder } : { border: incorrectBorder } }
                  disabled={ counter <= 0 }
                  className="me-4 btn btn-success px-5 py-3 mt-5"
                >
                  {he.decode(questions)}
                </button>
              ))}
        </section>

        {(isAnswered || counter === 0)
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNext }
            className="btn btn-primary mt-5 px-5 py-3"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  settingsToApi: PropTypes.objectOf(PropTypes.string).isRequired,
  setUserScore: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settingsToApi: state.triviaSettings,
});

const mapDispatchToProps = (dispatch) => ({
  setUserScore: (score) => dispatch(saveScore(score)),
  setAssertions: (assertions) => dispatch(getAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
