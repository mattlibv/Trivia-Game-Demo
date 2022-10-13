import App from "../App";
import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const mockToken = {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}
const badRequest = {
  response_code: 3,
  results: [],
}
const mockQuestion = {
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
      {
        "category": "Science & Nature",
        "type": "multiple",
        "difficulty": "hard",
        "question": "In quantum physics, which of these theorised sub-atomic particles has yet to be observed?",
        "correct_answer": "Graviton",
        "incorrect_answers": [
          "Z boson",
          "Tau neutrino",
          "Gluon"
        ]
      },
      {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Generally, which component of a computer draws the most power?",
        "correct_answer": "Video Card",
        "incorrect_answers": [
          "Hard Drive",
          "Processor",
          "Power Supply"
        ]
      },
      {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "easy",
        "question": "What is the most expensive weapon in Counter-Strike: Global Offensive?",
        "correct_answer": "Scar-20/G3SG1",
        "incorrect_answers": [
          "M4A1",
          "AWP",
          "R8 Revolver"
        ]
      },
      {
        "category": "Entertainment: Japanese Anime & Manga",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Who was the Author of the manga Uzumaki?",
        "correct_answer": "Junji Ito",
        "incorrect_answers": [
          "Noboru Takahashi",
          "Akira Toriyama",
          "Masashi Kishimoto",
        ],
      },
    ],
};

describe('Testes de game', () => {
  it('Testa um badrequest da api', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const mockAPICall = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(badRequest),
    })
    .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockToken),
    });
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    await waitFor(() => userEvent.click(screen.getByTestId('btn-play')));
    await waitFor(() => expect(history.location.pathname).toBe("/game"));
    await waitFor(() => expect(history.location.pathname).toBe("/"));
  });
  jest.setTimeout(40000);
  it('Testa um timeout de resposta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const mockAPICall = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockQuestion),
    })
    .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockToken),
    });
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    userEvent.click(await screen.findByTestId('btn-play'));
    await waitFor(() => expect(history.location.pathname).toBe("/game"));
    jest.spyOn(global, 'clearTimeout');
    await screen.findAllByTestId(/wrong-answer../i);
    const timedOutBtns = await screen.findAllByRole('button');
    expect(timedOutBtns).toHaveLength(2);
    await new Promise((r) => setTimeout(r, 32000));
    const answer = await screen.findByTestId('correct-answer');
    waitFor (() => expect(answer).toBeDisabled());
    waitFor (async () => expect(await screen.findByTestId('time-stamp')).toBe(0));
    userEvent.click(screen.getByTestId('btn-next'));
    waitFor (async () => expect(await screen.findByTestId('time-stamp')).toBe(30));
  });
});
