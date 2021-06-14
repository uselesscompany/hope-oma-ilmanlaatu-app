import styles from './iconButtons.module.css';
import { ReactNode } from 'react';
import clsx from 'clsx';

export const IconButtonsRow = (props: { children: ReactNode }): JSX.Element => (
  <div className={styles.iconButtonsRow}>{props.children}</div>
);

export const EmptyDiv = (): JSX.Element => (
  <div className={styles.emptyDiv}></div>
);

interface IconButtonsContainerProps {
  hidden?: boolean;
  children?: ReactNode;
}

export const IconButtonsContainer = (
  props: IconButtonsContainerProps
): JSX.Element => (
  <div
    className={clsx({
      [styles.iconButtonsContainer]: true,
      [styles.hidden]: props.hidden,
    })}
  >
    {props.children}
  </div>
);

const BurnLogo = '/noun_fireplace_1289774.svg';
const TransportLogo = '/noun_transportation_1714581.svg';
const LifestyleLogo = '/noun_bio_mass_2971483.svg';
const BicycleLogo = '/voting_icons/noun_Bicycle_835872.svg';
const BusLogo = '/voting_icons/noun_bus station_2170124.svg';
const TireLogo = '/voting_icons/noun_tire_1618722.svg';
const CleanLogo = '/voting_icons/noun_cleaning_3355801.svg';
const AsphaltLogo = '/voting_icons/noun_Road_2681766.svg';
const CargoBikeLogo = '/voting_icons/noun_Cargo Bike_499347.svg';
const SandLogo = '/voting_icons/noun_sand_24412.svg';
const SpeedLogo = '/voting_icons/noun_speed_3267150.svg';
const QuestionLogo = '/voting_icons/question.svg';
const MobileLogo = '/voting_icons/noun_Mobile_3268413.svg';

export const Icons = [
  BurnLogo,
  TransportLogo,
  LifestyleLogo,
  BicycleLogo,
  BusLogo,
  TireLogo,
  CleanLogo,
  AsphaltLogo,
  CargoBikeLogo,
  SandLogo,
  SpeedLogo,
  QuestionLogo,
  MobileLogo,
];
