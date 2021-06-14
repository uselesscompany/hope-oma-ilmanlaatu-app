import { ReactNode } from 'react';
import styles from './quizRow.module.css';

export const QuizRow = (props: { children: ReactNode }): JSX.Element => (
  <div className={styles.quizRow}>{props.children}</div>
);
