import React from 'react';
import styles from './appLogo.module.css';

interface Props {
  src: string;
  height: string;
  width: string;
  alt: string;
}

export const PagePhoto = (props: Props): JSX.Element => (
  <img
    className={styles.pagePhoto}
    src={props.src}
    alt={props.alt}
    height={props.height}
    width={props.width}
  />
);
