import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { categoriesResponse } from './mocks/triviaApiMock'

afterEach(() => jest.clearAllMocks());

describe('Settings page tests', () => {
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
  
  it('Should have all categories in category selector', async () => {
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
    const {trivia_categories: triviaCategories} = categoriesResponse

    triviaCategories.forEach(async ({name}) => {
      const category = await screen.findByRole('option', { name });
      expect(category).toBeInTheDocument();
    });
  });
})