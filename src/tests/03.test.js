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
    userEvent.click(await screen.findByTestId(correct));
    const next2 = await screen.findByTestId(btnNext);
    userEvent.click(next2);
    await screen.findByTestId('question-text');
    userEvent.click(await screen.findByTestId(correct));
    const next3 = await screen.findByTestId(btnNext);
    userEvent.click(next3);
    await screen.findByTestId('question-text');
    userEvent.click(await screen.findByTestId(correct));
    const next4 = await screen.findByTestId(btnNext);
    userEvent.click(next4);
    await screen.findByTestId('question-text');
    userEvent.click(await screen.findByTestId(correct));
    const next5 = await screen.findByTestId(btnNext);
    userEvent.click(next5);
    await screen.findByTestId('feedback-text');
    debug();
    // waitFor(() => expect(screen.findByRole('button', {name: Next})).toBeInTheDocument());
    // userEvent.click(await screen.findByTestId(btnNext));
    // // PERGUNTA 2:
    // userEvent.click(await screen.findByTestId(correct));
    // waitFor(() => expect(screen.findByRole('button', {name: Next})).toBeInTheDocument());
    // userEvent.click(await screen.findByTestId(btnNext));
    // // PERGUNTA 3:
    // userEvent.click(await screen.findByTestId(correct));
    // waitFor(() => expect(screen.findByRole('button', {name: Next})).toBeInTheDocument());
    // userEvent.click(await screen.findByTestId(btnNext));
    // // PERGUNTA 4:
    // userEvent.click(await screen.findByTestId(correct));
    // waitFor(() => expect(screen.findByRole('button', {name: Next})).toBeInTheDocument());
    // userEvent.click(await screen.findByTestId(btnNext));
    // // PERGUNTA 5:
    // userEvent.click(await screen.findByTestId(correct));
    // waitFor(() => expect(screen.findByRole('button', {name: Next})).toBeInTheDocument());
    // userEvent.click(await screen.findByTestId(btnNext));
    // // TELA DE FEEDBACK
    // await waitFor(() => {
    //   const feedbackTxt = screen.getByTestId('feedback-text');
    //   expect(feedbackTxt.innerText).toBe('Well Done!');
    // });
    // const totalScore = screen.getByTestId('feedback-total-score');
    // expect(totalScore.innerText).toBe('5');
    // const totalAssertions = screen.getByTestId('feedback-total-question');
    // expect(totalAssertions.innerText).toBe('5');
  });
});
