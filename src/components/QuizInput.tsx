import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import styles from './quizInput.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  small?: boolean;
}

export const QuizInput = (props: Props): JSX.Element => (
  <input
    className={clsx({ [styles.quizInput]: true, [styles.small]: props.small })}
    {...props}
  />
);
