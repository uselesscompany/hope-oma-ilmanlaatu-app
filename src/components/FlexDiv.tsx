import { ReactNode } from 'react';
import styles from './flexDiv.module.css';

export const FlexDiv = (props: { children: ReactNode }): JSX.Element => (
  <div className={styles.flexDiv}>{props.children}</div>
);
