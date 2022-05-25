import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Login page test', () => {
  test('Verify if login is correctly render', () => {
   renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    const buttonPlay = screen.getByTestId(/btn-play/i); 
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    const buttonSettings = screen.getByTestId(/btn-settings/i); 
    expect(buttonSettings).toBeInTheDocument();  
  });

  test('Verify if play button redirect to game page', () => {
    const { history } =  renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByTestId(/btn-play/i); 
    expect(buttonPlay).toBeInTheDocument();

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputName, 'Geovana');
    userEvent.type(inputEmail, 'teste@trybe.com');

    userEvent.click(buttonPlay);
    history.push('/game');

  });

  test('Verify if settings button redirect to settings page', () => {
    const { history } =  renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByTestId(/btn-settings/i); 
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings);
    history.push('/settings');     
  });

  test('Verify if validation is working - both input rigth', () => {
   renderWithRouterAndRedux(<App />);

   const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    const buttonPlay = screen.getByTestId(/btn-play/i); 
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputName, 'Geovana');
    userEvent.type(inputEmail, 'teste@trybe.com');

    expect(buttonPlay).not.toBeDisabled();
        
  });

  test('Verify if validation is working - just inputName rigth', () => {
    renderWithRouterAndRedux(<App />);
 
    const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeDisabled();
 
     userEvent.type(inputName, 'Geovana');
     userEvent.type(inputEmail, 'teste@tryom');
 
     expect(buttonPlay).toBeDisabled();     
         
   });

   test('Verify if validation is working - both wrong', () => {
    renderWithRouterAndRedux(<App />);
 
    const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeInTheDocument();

     expect(buttonPlay).toBeDisabled();

     userEvent.type(inputName, '');
     expect(inputName).toHaveAttribute('value', ''); 
     userEvent.type(inputEmail, 'teste@tryom');
     expect(inputEmail).toHaveAttribute('value', 'teste@tryom');
 
     expect(buttonPlay).toBeDisabled();      
         
   });

   test('Verify if validation is working - just inputEmail rigth', () => {
    renderWithRouterAndRedux(<App />);
 
    const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeInTheDocument();

     expect(buttonPlay).toBeDisabled();

     userEvent.type(inputName, '');
     userEvent.type(inputEmail, 'teste@trybe.com');
 
     expect(buttonPlay).toBeDisabled();      
         
   });
});