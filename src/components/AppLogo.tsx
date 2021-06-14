import React, { ReactNode } from 'react';
import styles from './appLogo.module.css';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  inline?: boolean;
}

interface OverlapProps {
  children: ReactNode;
}

export const OverlapDiv = (props: OverlapProps): JSX.Element => (
  <div className={styles.overlap}>{props.children}</div>
);

class AppLogo extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Link href="/">
        <a>
          <img
            src={this.props.inline ? '/hope_logo_white.svg' : '/hope_logo.svg'}
            alt="logo"
            className={clsx({
              [styles.img]: true,
              [styles.inline]: this.props.inline,
            })}
          />
        </a>
      </Link>
    );
  }
}

export default AppLogo;
