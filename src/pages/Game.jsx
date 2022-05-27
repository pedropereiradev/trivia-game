import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { getAssertions, saveScore } from '../redux/actions';
import { getToken, saveToken } from '../services/ranking';
import { fetchApiGame } from '../services/triviaAPI';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      getQuestions: [],
      position: 0,
      correctBorder: '',
      incorrectBorder: '',
      isAnswered: false,
      counter: 30,
      isDisabled: false,
      score: 0,
      assertions: 0,
    };
  }

  componentDidMount = async () => {
    const { counter } = this.state;
    const { history } = this.props;

    const token = getToken();

    const questions = await fetchApiGame(token);

    if (questions.length > 0) {
      this.setState({
        getQuestions: questions,
      });
    } else {
      history.push('/');
      saveToken();
    }

    const ONE_SECOND = 1000;

    this.intervalId = setInterval(() => {
      if (counter > 0) {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }));
      }
    }, ONE_SECOND);
  }

  stopTimer = () => {
    clearInterval(this.intervalId);
  }

  handleClickNext = () => {
    const { getQuestions, position, counter } = this.state;
    const { history } = this.props;
    const ONE_SECOND = 1000;

    this.intervalId = setInterval(() => {
      if (counter > 0) {
        this.setState((previousState) => ({
          counter: previousState.counter - 1,
        }));
      }
    }, ONE_SECOND);

    if (position >= getQuestions.length - 1) {
      history.push('/feedback');
    }

    if (getQuestions.length > 0) {
      this.setState((previousState) => ({
        position: previousState.position + 1,
        correctBorder: '',
        incorrectBorder: '',
        counter: 30,
      }));
    }
  }

  multDifficulty = (getDifficulty) => {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    if (getDifficulty === 'easy') {
      return ONE;
    }
    if (getDifficulty === 'hard') {
      return TWO;
    } if (getDifficulty === 'medium') {
      return THREE;
    }
  }

  handleClickOption = ({ target }) => {
    this.stopTimer();
    const { getQuestions, counter, score } = this.state;
    const question = target.innerHTML;
    // console.log(question);
    const findQuestion = getQuestions.find((quest) => quest.correct_answer === question);
    if (findQuestion !== undefined) {
      const getDifficulty = findQuestion.difficulty;
      // console.log(getDifficulty);
      const TEN = 10;
      const totalScore = score + TEN + (counter * this.multDifficulty(getDifficulty));
      this.setState(({ assertions }) => ({
        score: totalScore,
        assertions: assertions + 1,
      }), () => {
        const { assertions } = this.state;
        const { setAssertions } = this.props;

        setAssertions(assertions);
      });
      // console.log(totalScore);

      const { setUserScore } = this.props;
      setUserScore(totalScore);
    }

    if (getQuestions.length > 0) {
      this.setState({
        correctBorder: '3px solid rgb(6, 240, 15)',
        incorrectBorder: '3px solid red',
        isAnswered: true,
      });
    }
  }

  render() {
    const { getQuestions, position, correctBorder, incorrectBorder,
      isAnswered, counter, isDisabled } = this.state;
    // console.log(getQuestions);
    // console.log(position);

    if (counter < 0) {
      this.setState({
        counter: 0,
        isDisabled: true,
      });
    }

    // Os botões das alternativas devem ser elementos irmãos; ou seja, não podem estar dentro de outra tag
    const correctOptions = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.handleClickOption }
        style={ { border: correctBorder } }
        disabled={ isDisabled }
      >
        {getQuestions.length > 0
        && getQuestions[position].correct_answer}
      </button>
    );

    const incorrectOptions = (
      getQuestions.length > 0
              && getQuestions[position].incorrect_answers.map((incorrects, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleClickOption }
                  style={ { border: incorrectBorder } }
                  disabled={ isDisabled }
                >
                  {incorrects}
                </button>
              )));

    const NUMBER_SHUFFLED = 0.5;

    const arrayAllOptions = getQuestions.length > 0
    && [correctOptions, ...incorrectOptions];

    const random = getQuestions.length > 0
&& arrayAllOptions.sort(() => Math.random() - NUMBER_SHUFFLED);

    return (
      <div>
        <Header />

        <p>{counter}</p>

        <p data-testid="question-category">
          {getQuestions.length > 0
          && getQuestions[position].category}
        </p>

        <p data-testid="question-text">
          {getQuestions.length > 0
          && getQuestions[position].question}
        </p>

        <p data-testid="answer-options">
          {getQuestions.length > 0
          && random.map((allOptions) => (allOptions))}
        </p>

        {isAnswered
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNext }
          >
            Next
          </button>
        )}

        {/* Pendente: lógica para ao chegar na última pergunta, voltar na primeira */}

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  setUserScore: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserScore: (score) => dispatch(saveScore(score)),
  setAssertions: (assertions) => dispatch(getAssertions(assertions)),
});

export default connect(null, mapDispatchToProps)(Game);

// REQUISITO 6

// Alternativas aleatórias https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=utilizando%20Console.log()%3A-,function%20shuffleArray(inputArray)%7B%0A%20%20%20%20inputArray.sort(()%3D%3E%20Math.random()%20%2D%200.5)%3B%0A%7D,-var%20demoArray%20%3D%20%5B1

// REQUISITO 8
// https://github.com/tryber/sd-020-a-live-lectures/blob/lecture/12.1/trybem-estar/src/components/Timer.js
// https://sebhastian.com/setinterval-react/
