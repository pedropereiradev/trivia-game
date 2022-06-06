import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { categoriesResponse, response } from './mocks/triviaApiMock'
import Settings from '../pages/Settings';

afterEach(() => jest.clearAllMocks());

describe('Settings page tests', () => {
 /* it('Should pass correct info to store', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(categoriesResponse),
      })
    );

    const initialState = {
      triviaSettings: {
        category: '',
        difficulty: '',
        type: '',
      },
    };
    
    renderWithRouterAndRedux(<App />, initialState, '/settings');


    const categorySelect = screen.getByRole('option', {
      name: /Todas categorias/i,
    });
    const difficultySelect = screen.getByRole('option', {
      name: /Qualquer dificuldade/i,
    });
    const typeSelect = screen.getByRole('option', {
      name: /Qualquer Tipo/i,
    });
    
    expect(categorySelect.selected).toBe(true);
    expect(difficultySelect.selected).toBe(true);
    expect(typeSelect.selected).toBe(true);

    const applySettingsButton = screen.getByRole('button', {
      name: /Aplicar configurações/i,
    });

    userEvent.click(applySettingsButton);

    const buttonTrue = await screen.findByTestId('correct-answer');
    await expect(buttonTrue).toBeInTheDocument();
  });*/

   it('Should pass correct info to store', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(categoriesResponse),
      })
    );
    
    const initialState = {
      triviaSettings: {
        category: '',
        difficulty: '',
        type: '',
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/settings');

    const categorySelect = screen.getByRole('option', {
      name: /Todas categorias/i,
    });
    const difficultySelect = screen.getByRole('option', {
      name: /Qualquer dificuldade/i,
    });
    const typeSelect = screen.getByRole('option', {
      name: /Qualquer Tipo/i,
    });

    await expect(categorySelect.selected).toBe(true);
    expect(difficultySelect.selected).toBe(true);
    expect(typeSelect.selected).toBe(true);

    const applySettingsButton = screen.getByRole('button', {
      name: /Aplicar configurações/i,
    });

    userEvent.click(applySettingsButton);

    const Timer = screen.getByText(/Timer/i);
    await expect(Timer).toBeInTheDocument();
   });
})