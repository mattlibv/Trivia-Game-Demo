import App from "../App";
import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa Header', () => {
  const mockToken = {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}
  const mockData = {
    response_code: 0,
    results: [
      {
        "category": "Geography",
        "type": "boolean",
        "difficulty": "easy",
        "question": "The Republic of Malta is the smallest microstate worldwide.",
        "correct_answer": "False",
        "incorrect_answers": [
          "True"
        ]
       },
      ]
    }
  test('Testa elementos renderizados no Header', async () => {
      const hash = 'ce11fce876c93ed5d2a72da660496473';
      const mockAPI = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
        })
        .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockToken),
        });        
      const { history } = renderWithRouterAndRedux(<App />);
      userEvent.type(screen.getByTestId('input-player-name'), 'teste');
      userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
      const playButton = screen.getByTestId('btn-play');
      expect(playButton).toBeEnabled();
      await waitFor(() => userEvent.click(playButton));
      await screen.findByTestId('header-profile-picture');
      expect(history.location.pathname).toBe("/game");
      await waitFor(() => {
        const avatar = screen.getByTestId('header-profile-picture');
        expect(avatar).toHaveAttribute('src', `https://www.gravatar.com/avatar/${hash}`);
        const userName = screen.getByTestId('header-player-name');
        expect(userName).toHaveTextContent('teste')
        const score = screen.getByTestId('header-score');
        expect(score.innerHTML).toBe('Pontuação: 0');
        expect(mockAPI).toHaveBeenCalledTimes(2);
      })
  })
});
