import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './pageHeader.module.css';

interface Props {
  children: ReactNode;
  inline?: boolean;
}

export const PageHeader = (props: Props): JSX.Element => (
  <div
    className={clsx({ [styles.header]: true, [styles.inline]: props.inline })}
  >
    {props.children}
  </div>
);
