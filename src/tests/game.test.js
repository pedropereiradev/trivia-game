import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { response, responseFailed } from './mocks/triviaApiMock';

import App from '../App';
import Game from '../pages/Game';

afterEach(() => jest.clearAllMocks());

describe('Game page test', () => {
  test('Verify if game is correctly render - since Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')

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

  test('Verify if the button Next redirect to Ranking after last question', async () => {
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

    const buttonPlayAgain = screen.getByRole("button", { name: /Play Again/i });
    expect(buttonPlayAgain).toBeInTheDocument();
    expect(buttonPlayAgain).not.toBeDisabled();

    const buttonRanking = screen.getByRole("button", { name: /Ranking/i });
    expect(buttonRanking).toBeInTheDocument();
    expect(buttonRanking).not.toBeDisabled();
  });

  test('Should score update when click on easy correct answer', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(40);
  });

  test('Should score update when click on medium correct answer', async () => {
    response.results[0].difficulty = 'medium';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(70);
  });

  test('Should score update when click on hard correct answer', async () => {
    response.results[0].difficulty = 'hard';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(100);
  });

  test('Should return as easy question when do not have getDifficulty', async () => {
    response.results[0].difficulty = '';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(40);
  });


  test('Should redirect to Login page when API response failed', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(responseFailed),
      })
    );

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});