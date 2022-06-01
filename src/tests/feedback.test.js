import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Feedback page test', () => {
  test('Verify if button "play again" is working correctly', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 3,
      },
    };

    const { history } =  renderWithRouterAndRedux(<App />, initialState, '/feedback');
    
    const buttonPlayAgain = screen.getByRole("button", { name: /Play Again/i }); 
    
    expect(buttonPlayAgain).toBeInTheDocument(); 
    expect(buttonPlayAgain).not.toBeDisabled();
    
    userEvent.click(buttonPlayAgain);
    
    expect(history.location.pathname).toBe('/'); 
  });

  test('Verify if button "ranking" is working correctly', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 3,
      },
    };

    const { history } =  renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const buttonRanking= screen.getByRole("button", {name: /Ranking/i}); 
    
    expect(buttonRanking).toBeInTheDocument(); 
    expect(buttonRanking).not.toBeDisabled();
    
    userEvent.click(buttonRanking);
    
    expect(history.location.pathname).toBe('/ranking');

    const buttonPlayAgain= screen.getByRole("button", {name: /Jogar novamente/i}); 
    
    expect(buttonPlayAgain).toBeInTheDocument(); 

  });

  test('Verify if elements are render correctly', async () => {
    const { history } =  renderWithRouterAndRedux(<Feedback />);

    const img = await screen.findByAltText('off symbol');
    await expect(img).toBeInTheDocument();

    const playerName = await screen.findByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const message1 = screen.getByRole('heading', { name: /Could be better.../i, level: 2 });
    expect(message1).toBeInTheDocument();

    const message = screen.getByTestId(/feedback-text/i);
    expect(message).toBeInTheDocument();

    const point = screen.getByTestId(/feedback-total-score/i);
    expect(point).toBeInTheDocument();

    const question = screen.getByTestId(/feedback-total-question/i);
    expect(question).toBeInTheDocument();
  });

  test('Should show "Could be better..." when assert less then three questions', () => {
    const initialState = {
      player: {
        name: 'pedro',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 1,
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const feedbackMessage = screen.getByRole('heading', {
      name: /Could be better.../i,
      level: 2,
    });
    
    expect(feedbackMessage).toBeInTheDocument();
  });

  test('Should show "Well Done!" when assert 3 or more questions', async () => {
    const initialState = {
      player: {
        name: 'pedro',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 3,
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const feedbackMessage = screen.getByRole('heading', {
      name: 'Well Done!',
      level: 2,
    });
    
    expect(feedbackMessage).toBeInTheDocument();
  });

  test('Should show "Questão" when just one assertion', () => {
    const initialState = {
      player: {
        name: 'pedro',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 1,
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const assertionText = screen.getByText(/questão/i);

    expect(assertionText).toBeInTheDocument();
    expect(assertionText).not.toBe(/questões/i);
  });

  test('Should show "Questões" when more then one assertion', () => {
    const initialState = {
      player: {
        name: 'pedro',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 2,
      },
    };
    
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const assertionText = screen.getByText(/questões/i);

    expect(assertionText).toBeInTheDocument();
    expect(assertionText).not.toBe(/questão/i);
  });
});