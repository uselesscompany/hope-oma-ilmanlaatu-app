import { ReactNode } from 'react';
import styles from './flexForm.module.css';

export const FlexForm = (props: { children: ReactNode }): JSX.Element => (
  <form className={styles.form}>{props.children}</form>
);
