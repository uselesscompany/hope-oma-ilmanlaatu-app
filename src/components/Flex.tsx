import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './flex.module.css';

interface Props {
  children: ReactNode;
}

export const FlexColumn = (props: Props): JSX.Element => (
  <div className={styles.column}>{props.children}</div>
);

export const FlexRow = (props: Props): JSX.Element => (
  <div className={styles.row}>{props.children}</div>
);

export const FlexRowAligned = (props: Props): JSX.Element => (
  <div className={clsx({ [styles.row]: true, [styles.align]: true })}>
    {props.children}
  </div>
);

export const SpacedFlexRow = (props: Props): JSX.Element => (
  <div className={clsx({ [styles.row]: true, [styles.spaced]: true })}>
    {props.children}
  </div>
);
