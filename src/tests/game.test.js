import React from 'react';
import { findByTestId, findByText, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { element } from 'prop-types';

describe('Game page test', () => {
  test('Verify if game is correctly render', async () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, 'Geovana');
    userEvent.type(inputEmail, 'teste@trybe.com');
  
    const buttonPlay = screen.getByTestId(/btn-play/i);
    expect(buttonPlay).toBeInTheDocument();

    const buttonSettings = screen.getByTestId(/btn-settings/i);
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonPlay);

    const img = await screen.findByAltText('off symbol');
    await expect(img).toBeInTheDocument();

    const playerName = await screen.findByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const buttonTrue = await screen.findByTestId('correct-answer')
   await expect(buttonTrue).toBeInTheDocument();

    const buttonsFalse = await screen.findAllByTestId(/wrong-answer-/i);
    buttonsFalse.forEach((buttons) => { 
   expect(buttons).toBeInTheDocument(); 
})
  });

  test('Verify if border selector works', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')
    const buttonTrue = await screen.findByTestId('correct-answer')
    await expect(buttonTrue).toBeInTheDocument();
    const buttonsFalse = await screen.findAllByTestId(/wrong-answer-/i)
    buttonsFalse.map((button) => expect(button).toBeInTheDocument());
    userEvent.click(buttonTrue);
    await expect(buttonTrue).toHaveAttribute('style', 'border: 3px solid rgb(6, 240, 15);');
    userEvent.click(buttonsFalse[0]);
    await expect(buttonsFalse[0]).toHaveAttribute('style', 'border: 3px solid red;');

    const buttonNext = await screen.findByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext);

     expect(buttonTrue).not.toHaveAttribute();
     await expect(buttonsFalse[0]).not.toHaveAttribute();
  });

  test('sdass', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')
    const buttonTrue = await screen.findByTestId('correct-answer')
    await expect(buttonTrue).toBeInTheDocument();

    userEvent.click(buttonTrue);

    const buttonNext = await screen.findByTestId(/btn-next/i);
     userEvent.click(buttonNext);

    userEvent.click(buttonTrue);
     userEvent.click(buttonNext);

    userEvent.click(buttonTrue);
     userEvent.click(buttonNext);

    userEvent.click(buttonTrue);
     userEvent.click(buttonNext);

    userEvent.click(buttonTrue);
     userEvent.click(buttonNext);

    const buttonPlayAgain= screen.getByRole("button", {name: /Play Again/i}); 
    expect(buttonPlayAgain).toBeInTheDocument(); 
    expect(buttonPlayAgain).not.toBeDisabled();

    const buttonRanking= screen.getByRole("button", {name: /Ranking/i}); 
    expect(buttonRanking).toBeInTheDocument(); 
    expect(buttonRanking).not.toBeDisabled();
});
});