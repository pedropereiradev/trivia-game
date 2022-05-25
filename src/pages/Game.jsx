import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      getQuestions: [],
      position: 0,
    };
  }

  componentDidMount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const result = await response.json();
      console.log(result);

      if (result.results.length > 0) {
        this.setState({
          getQuestions: result.results,
        });
      } else {
        const { history } = this.props;
        history.push('/');
        localStorage.setItem('token', '');
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = () => {
    const { getQuestions } = this.state;
    if (getQuestions.length > 0) {
      this.setState((previousState) => ({
        position: previousState.position + 1,
      }));
    }
  }

  render() {
    const { getQuestions, position } = this.state;

    console.log(getQuestions);

    // Os botões das alternativas devem ser elementos irmãos; ou seja, não podem estar dentro de outra tag

    const correctOptions = (
      <button
        type="button"
        data-testid="correct-answer"
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

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Next Question
        </button>

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
