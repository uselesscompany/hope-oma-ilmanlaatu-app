import { ReactNode } from 'react';
import styles from './pageBody.module.css';

interface Props {
  children: ReactNode;
}

export const PageBody = (props: Props): JSX.Element => (
  <div className={styles.pageBody}>{props.children}</div>
);

export const LightPageBody = (props: Props): JSX.Element => (
  <div className={styles.lightPageBody}>{props.children}</div>
);
