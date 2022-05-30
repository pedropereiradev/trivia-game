import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App'

describe('Feedback page test', () => {
  test('Verify if button "play again" is working correctly', () => {
    const { history } =  renderWithRouterAndRedux(<App />);
   history.push('/feedback')
    const buttonPlayAgain= screen.getByRole("button", {name: /Play Again/i}); 
    expect(buttonPlayAgain).toBeInTheDocument(); 
    expect(buttonPlayAgain).not.toBeDisabled();
    userEvent.click(buttonPlayAgain);
    expect(history.location.pathname).toBe('/'); 
  });

  test('Verify if button "ranking" is working correctly', () => {
    const { history } =  renderWithRouterAndRedux(<App />);
    history.push('/feedback')

    const buttonRanking= screen.getByRole("button", {name: /Ranking/i}); 
    expect(buttonRanking).toBeInTheDocument(); 
    expect(buttonRanking).not.toBeDisabled();
    userEvent.click(buttonRanking);
    expect(history.location.pathname).toBe('/ranking');

    const buttonPlayAgain= screen.getByRole("button", {name: /Play Again/i}); 
    expect(buttonPlayAgain).toBeInTheDocument(); 
    expect(buttonPlayAgain).not.toBeDisabled();
    userEvent.click(buttonPlayAgain);
    expect(history.location.pathname).toBe('/');   
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
});