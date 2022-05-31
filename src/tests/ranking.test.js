import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Ranking page', () => {
  test('Should redirect to login page when "Play again" button is clicked', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 2,
      },
    };
    
    renderWithRouterAndRedux(<App />, initialState, '/ranking');

    const buttonPlayAgain = screen.getByRole('button', {
      name: /Jogar novamente/i,
    });
    
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);
    
    const buttonPlay = screen.getByTestId(/btn-play/i);
    const buttonSettings = screen.getByTestId(/btn-settings/i);
    
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument(); 
  });
})