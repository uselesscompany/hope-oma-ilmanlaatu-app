import React, { ReactNode, useEffect, useState } from 'react';
import styles from './meter.module.css';

interface Props {
  value: number;
}

interface SVGProps {
  width: string;
}

const Container = (props: { children: ReactNode }) => (
  <div className={styles.container}>{props.children}</div>
);

const translateValueToRotation = (value: number): number => {
  return Math.ceil((value / 100) * 180);
};

const Meter = (props: Props): JSX.Element => {
  const startingRotation = translateValueToRotation(props.value);
  const [rotation, setRotation] = useState(startingRotation);
  const [targetRotation, setTargetRotation] = useState(startingRotation);
  const [transform, setTransform] = useState(
    'rotate(' + startingRotation + ' 150 111)'
  );

  const move = () => {
    if (rotation !== targetRotation) {
      const rotationChange = rotation < targetRotation ? 1 : -1;
      const newRotation = rotation + rotationChange;
      setRotation(newRotation);
      setTransform('rotate(' + newRotation + ' 150 111)');
    }
  };

  let timeout: NodeJS.Timeout;

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(move, 10);
    return () => clearTimeout(timeout);
  }, [rotation, targetRotation]);

  useEffect(() => {
    setTargetRotation(translateValueToRotation(props.value));
  }, [props.value]);

  const SVG = (props: SVGProps): JSX.Element => {
    return (
      <svg
        viewBox="0 0 300 135"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
        preserveAspectRatio="xMidYMin slice"
        width={props.width}
      >
        <g fillRule="nonzero">
          <path
            d="M45.78 111.169a3.014 3.014 0 01-2.995-3.176 107.421 107.421 0 013.299-20.826 3.008 3.008 0 013.83-2.095l35.245 11.452a3.011 3.011 0 011.998 3.517 64.433 64.433 0 00-1.33 8.401 3.011 3.011 0 01-2.988 2.727H45.78z"
            fill="#888"
          />
          <path
            d="M51.849 79.117a3.007 3.007 0 01-1.867-3.947 107.46 107.46 0 019.572-18.787 3.004 3.004 0 014.29-.809l29.982 21.783a3.011 3.011 0 01.813 3.962 64.572 64.572 0 00-3.861 7.579 3.013 3.013 0 01-3.684 1.671L51.849 79.117z"
            fill="#838d8a"
          />
          <path
            d="M67.525 50.508a3 3 0 01-.556-4.33 107.4 107.4 0 0114.909-14.909 3.002 3.002 0 014.33.556l21.783 29.981a3.012 3.012 0 01-.45 4.02 64.43 64.43 0 00-6.015 6.015 3.012 3.012 0 01-4.02.45L67.525 50.508z"
            fill="#7d938c"
          />
          <path
            d="M91.274 28.144a3.002 3.002 0 01.809-4.29 107.46 107.46 0 0118.787-9.572 3.007 3.007 0 013.947 1.867l11.452 35.245a3.013 3.013 0 01-1.671 3.684 64.572 64.572 0 00-7.579 3.861 3.011 3.011 0 01-3.962-.813L91.274 28.144z"
            fill="#78988d"
          />
          <path
            d="M120.772 14.214a3.008 3.008 0 012.095-3.83 107.421 107.421 0 0120.826-3.299 3.014 3.014 0 013.176 2.995v37.059a3.011 3.011 0 01-2.727 2.988 64.433 64.433 0 00-8.401 1.33 3.011 3.011 0 01-3.517-1.998l-11.452-35.245z"
            fill="#739e8f"
          />
          <path
            d="M153.131 10.08a3.014 3.014 0 013.176-2.995 107.421 107.421 0 0120.826 3.299 3.008 3.008 0 012.095 3.83l-11.452 35.245a3.011 3.011 0 01-3.517 1.998 64.433 64.433 0 00-8.401-1.33 3.011 3.011 0 01-2.727-2.988V10.08z"
            fill="#6da391"
          />
          <path
            d="M185.183 16.149a3.007 3.007 0 013.947-1.867 107.46 107.46 0 0118.787 9.572 3.004 3.004 0 01.809 4.29l-21.783 29.982a3.011 3.011 0 01-3.962.813 64.572 64.572 0 00-7.579-3.861 3.013 3.013 0 01-1.671-3.684l11.452-35.245z"
            fill="#68a993"
          />
          <path
            d="M213.792 31.825a3 3 0 014.33-.556 107.4 107.4 0 0114.909 14.909 3.002 3.002 0 01-.556 4.33l-29.981 21.783a3.012 3.012 0 01-4.02-.45 64.43 64.43 0 00-6.015-6.015 3.012 3.012 0 01-.45-4.02l21.783-29.981z"
            fill="#63ae94"
          />
          <path
            d="M236.156 55.574a3.002 3.002 0 014.29.809 107.46 107.46 0 019.572 18.787 3.007 3.007 0 01-1.867 3.947l-35.245 11.452a3.013 3.013 0 01-3.684-1.671 64.572 64.572 0 00-3.861-7.579 3.011 3.011 0 01.813-3.962l29.982-21.783z"
            fill="#5db496"
          />
          <path
            d="M250.086 85.072a3.008 3.008 0 013.83 2.095 107.421 107.421 0 013.299 20.826 3.014 3.014 0 01-2.995 3.176h-37.059a3.011 3.011 0 01-2.988-2.727 64.433 64.433 0 00-1.33-8.401 3.011 3.011 0 011.998-3.517l35.245-11.452z"
            fill="#58b998"
          />
        </g>
        <path
          transform={transform}
          d="M90 110.994c0-1.641 47.889-5.746 57.466-4.925 3.379.29 3.379 9.561 0 9.851-9.577.821-57.466-3.284-57.466-4.926z"
        />
      </svg>
    );
  };

  return (
    <Container>
      <img src="/noun_confused_2972824.svg" alt="Negative icon for meter" />
      <SVG width="40vw" />
      <img src="/noun_Happy_2693990.svg" alt="Positive icon for meter" />
    </Container>
  );
};

export default Meter;
