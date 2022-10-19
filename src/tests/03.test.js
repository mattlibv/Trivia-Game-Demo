import App from "../App";
import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa tela de Feedback', () => {
const mockToken = {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
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
  test('Testa um jogo 100% certo na tela de Feedback', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />);
    const mockAPICall = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockQuestion),
    })
    .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockToken),
    });
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    await waitFor(() => userEvent.click(screen.getByTestId('btn-play')));
    await waitFor(() => expect(history.location.pathname).toBe("/game"));
    const correct = 'correct-answer';
    const btnNext = 'btn-next';
    // PERGUNTA 1:
    await screen.findByTestId('question-text');
    userEvent.click(await screen.findByTestId(correct));
    const next1 = await screen.findByTestId(btnNext);
    userEvent.click(next1);
    await screen.findByTestId('question-text');
    // PERGUNTA 2:
    userEvent.click(await screen.findByTestId(correct));
    const next2 = await screen.findByTestId(btnNext);
    userEvent.click(next2);
    await screen.findByTestId('question-text');
    // PERGUNTA 3:
    userEvent.click(await screen.findByTestId(correct));
    const next3 = await screen.findByTestId(btnNext);
    userEvent.click(next3);
    await screen.findByTestId('question-text');
    // PERGUNTA 4:
    userEvent.click(await screen.findByTestId(correct));
    const next4 = await screen.findByTestId(btnNext);
    userEvent.click(next4);
    await screen.findByTestId('question-text');
    // PERGUNTA 5:
    userEvent.click(await screen.findByTestId(correct));
    const next5 = await screen.findByTestId(btnNext);
    userEvent.click(next5);
    await screen.findByTestId('feedback-text');
    // // TELA DE FEEDBACK
    const feedbackTxt = await screen.findByTestId('feedback-text');
    expect(feedbackTxt.innerHTML).toBe('Well Done!');
    const totalScore = await screen.findByTestId('feedback-total-score');
    expect(totalScore.innerHTML).toBe('Sua pontuação: 350');
    const totalAssertions = await screen.findByTestId('feedback-total-question');
    expect(totalAssertions.innerHTML).toBe('Número de acertos: 5');
    userEvent.click(await screen.findByTestId('btn-play-again'));
    const newGameButton = await screen.findByTestId('btn-play');
    expect(newGameButton).toBeDefined();
  });
  test('Testa um jogo com erros', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const mockAPICall = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockQuestion),
    })
    .mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockToken),
    });
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    await waitFor(() => userEvent.click(screen.getByTestId('btn-play')));
    await waitFor(() => expect(history.location.pathname).toBe("/game"));
    const wrong = /wrong-answer../i;
    const btnNext = 'btn-next';
    // PERGUNTA 1:
    await screen.findByTestId('question-text');
    userEvent.click(await screen.findByTestId(wrong));
    const next1 = await screen.findByTestId(btnNext);
    userEvent.click(next1);
    await screen.findByTestId('question-text');
    // PERGUNTA 2:
    const wrong2 = await screen.findAllByTestId(wrong);
    userEvent.click(wrong2[0]);
    const next2 = await screen.findByTestId(btnNext);
    userEvent.click(next2);
    await screen.findByTestId('question-text');
    // PERGUNTA 3:
    const wrong3 = await screen.findAllByTestId(wrong);
    userEvent.click(wrong3[0]);
    const next3 = await screen.findByTestId(btnNext);
    userEvent.click(next3);
    await screen.findByTestId('question-text');
    // PERGUNTA 4:
    const wrong4 = await screen.findAllByTestId(wrong);
    userEvent.click(wrong4[0]);
    const next4 = await screen.findByTestId(btnNext);
    userEvent.click(next4);
    await screen.findByTestId('question-text');
    // PERGUNTA 5:
    const wrong5 = await screen.findAllByTestId(wrong);
    userEvent.click(wrong5[0]);
    const next5 = await screen.findByTestId(btnNext);
    userEvent.click(next5);
    const notGood = await screen.findByTestId('feedback-text');
    expect(notGood.innerHTML).toBe('Could be better...');
    const totalScore = await screen.findByTestId('feedback-total-score');
    expect(totalScore.innerHTML).toBe('Sua pontuação: 0');
    const totalAssertions = await screen.findByTestId('feedback-total-question');
    expect(totalAssertions.innerHTML).toBe('Número de acertos: 0');
    const rankingBtn = await screen.findByTestId('btn-ranking');
    userEvent.click(rankingBtn);
    const player = await screen.findByTestId('player-name-0');
    expect(player.innerHTML).toBe('Jogador(a): teste');
    const newGame = await screen.findByTestId('btn-go-home');
    userEvent.click(newGame);
    screen.findByTestId('btn-play');
    waitFor(() => expect(history.location.pathname).toBe("/"));
  })
});
