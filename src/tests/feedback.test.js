import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Feedback page test', () => {
  test('Verify if both buttons are working correctly', () => {
    const { history } =  renderWithRouterAndRedux(<Feedback />);

    const buttonPlayAgain= screen.getByRole("button", {name: /Play Again/i}); 
    expect(buttonPlayAgain).toBeInTheDocument(); 
    expect(buttonPlayAgain).not.toBeDisabled();
    userEvent.click(buttonPlayAgain);
    history.push('/');

    const buttonRanking= screen.getByRole("button", {name: /Ranking/i}); 
    expect(buttonRanking).toBeInTheDocument(); 
    expect(buttonRanking).not.toBeDisabled();
    userEvent.click(buttonRanking);
    history.push('/ranking');
  });

});