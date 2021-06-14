import { ReactNode } from 'react';
import styles from './question.module.css';

export const Question = (props: { children: ReactNode }): JSX.Element => (
  <h3 className={styles.question}>{props.children}</h3>
);
