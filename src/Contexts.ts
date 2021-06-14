import React from 'react';
import { DEFAULT, State } from './constants/State';
import { Languages } from './translations';

export const LanguageContext = React.createContext(Languages.en);

export const QuizContext = React.createContext({
  quizState: DEFAULT,
  setQuizState: (_newQuizState: State) => {
    // this is initialized in the _app.tsx
  },
});
