import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import styles from './linkButton.module.css';

type Props = {
  negative?: boolean;
  small?: boolean;
  children?: ReactNode;
  onClick?: (event: any | undefined) => void;
  iconButton?: boolean;
};

const linkButtonFunction = (
  props: Props,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element => (
  <button
    className={clsx({
      [styles.linkButton]: true,
      [styles.negative]: props.negative,
      [styles.small]: props.small,
      [styles.iconButton]: props.iconButton,
    })}
    ref={ref}
    {...props}
  >
    {props.children}
  </button>
);

export const LinkButton = forwardRef<HTMLButtonElement, Props>(
  linkButtonFunction
);
