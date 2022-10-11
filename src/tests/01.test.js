import App from "../App";
import React from "react";
import Config from "../pages/Config";
import Game from "../pages/Game";
import Login from "../pages/Login";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe("Testando telas iniciais.", () => {
    beforeEach(cleanup);
    const mockToken = {
        "response_code": 0,
        "response_message": "Token Generated Successfully!",
        "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
    test('Teste', async () => {
        renderWithRouterAndRedux(<App />);
        const mockAPICall = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockToken),
        });
        userEvent.type(screen.getByTestId('input-player-name'), 'teste');
        userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
        waitFor(() => userEvent.click(screen.getByTestId('btn-play')));
        expect(mockAPICall).toBeCalledTimes(1);
        }); 
    test("Testando botão de configuração.", () => {
        const { history } = renderWithRouterAndRedux(<App />);
        userEvent.click(screen.getByTestId('btn-settings'));
        expect(history.location.pathname).toBe("/config");
    })  
});
