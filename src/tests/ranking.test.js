import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Ranking page', () => {
  test('Should redirect to login page when "Play again" button is clicked', () => {
    renderWithRouterAndRedux(<App />, null, '/ranking');

    const buttonPlayAgain = screen.getByRole('button', { name: /Play Again/i });
    
    userEvent.click(buttonPlayAgain);

    const buttonPlay = screen.getByTestId(/btn-play/i);
    const buttonSettings = screen.getByTestId(/btn-settings/i);
    
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();  
  });
})