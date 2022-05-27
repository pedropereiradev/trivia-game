import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getQuestions: [],
      position: 0,
      correctBorder: '',
      incorrectBorder: '',
      isAnswered: false,
      counter: 30,
      isDisabled: false,
      rightAnswer: [],
      shuffledArray: [],
    };
  }

  componentDidMount = async () => {
    const { counter } = this.state;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const { results } = await response.json();
      console.log(results);

      if (results.length > 0) {
        this.setState({
          getQuestions: results,
        }, () => {
          const { getQuestions } = this.state;
          const NUMBER_SHUFFLED = 0.5;
          getQuestions.map((questionObj) => (
            this.setState((prevState) => ({
              shuffledArray: [...prevState.shuffledArray, [questionObj
                .correct_answer, ...questionObj.incorrect_answers]
                .sort(() => Math.random() - NUMBER_SHUFFLED)],
              rightAnswer: [...prevState.rightAnswer, questionObj.correct_answer],
            }))
          ));
        });
      } else {
        const { history } = this.props;
        history.push('/');
        localStorage.setItem('token', '');
      }
    } catch (error) {
      console.log(error);
    }

    const ONE_SECOND = 1000;

    setInterval(() => {
      if (counter > 0) {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }));
      }
    }, ONE_SECOND);
  }

  handleClickNext = () => {
    const { getQuestions } = this.state;
    if (getQuestions.length > 0) {
      this.setState((previousState) => ({
        position: previousState.position + 1,
        correctBorder: '',
        incorrectBorder: '',
      }));
    }
  }

  handleClickOption = () => {
    const { getQuestions, shuffledArray } = this.state;
    console.log(shuffledArray[0]);
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
      isAnswered, counter, isDisabled, rightAnswer, shuffledArray } = this.state;

    if (counter < 0) {
      this.setState({
        counter: 0,
        isDisabled: true,
      });
    }

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
                  disabled={ isDisabled }
                >
                  {questions}
                </button>
              ))}
        </section>

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
};

export default Game;

// REQUISITO 6

// Alternativas aleatórias https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=utilizando%20Console.log()%3A-,function%20shuffleArray(inputArray)%7B%0A%20%20%20%20inputArray.sort(()%3D%3E%20Math.random()%20%2D%200.5)%3B%0A%7D,-var%20demoArray%20%3D%20%5B1

// REQUISITO 8
// https://github.com/tryber/sd-020-a-live-lectures/blob/lecture/12.1/trybem-estar/src/components/Timer.js
// https://sebhastian.com/setinterval-react/
