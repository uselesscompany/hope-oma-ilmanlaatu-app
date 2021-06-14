import { Answers } from 'src/constants/Quiz';

export const sendQuizAnswersToDatabase = (_answers: Answers): Promise<void> => {
  throw new Error('Function not implemented.');
};

export const sendRatingToDatabase = (
  _rating: number,
  _label: string
): Promise<void> => {
  throw new Error('Function not implemented.');
};
