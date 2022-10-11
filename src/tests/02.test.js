import App from "../App";
import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa Header', () => {
  test('Testa elementos renderizados no Header', async () => {
      const hash = 'ce11fce876c93ed5d2a72da660496473';
      const mockAPI = jest.spyOn(global, 'fetch');
      const { history } = renderWithRouterAndRedux(<App />);
      userEvent.type(screen.getByTestId('input-player-name'), 'teste');
      userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
      const playButton = screen.getByTestId('btn-play');
      expect(playButton).toBeEnabled();
      await waitFor(() => userEvent.click(playButton));
      await waitFor(() => expect(history.location.pathname).toBe("/game"));
      await waitFor(() => {
        const avatar = screen.getByTestId('header-profile-picture');
        expect(avatar).toHaveAttribute('src', `https://www.gravatar.com/avatar/${hash}`);
        const userName = screen.getByTestId('header-player-name');
        expect(userName).toHaveTextContent('teste')
        const score = screen.getByTestId('header-score');
        expect(score.innerHTML).toBe('0');
        expect(mockAPI).toHaveBeenCalledTimes(2);
      })
  })
});
