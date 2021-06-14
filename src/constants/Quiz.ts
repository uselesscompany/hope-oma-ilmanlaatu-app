import { CAR_AGE, CAR_FUEL, ELECTRICITY, FIREPLACE_TRASH_TYPE } from './Types';

export interface Car {
  owned?: boolean;
  year: string;
  frictionTires?: boolean;
  engineType: string;
  rangePerWeek: number;
  passengers: number;
}

export enum FIREPLACE_USAGE {
  NONE = 'none',
  WARMING = 'warming',
  LEISURE = 'leisure',
  BOTH = 'both',
}

export enum SMOKE_COLOR {
  BLACK = 'black',
  GREY = 'grey',
  LIGHT = 'light',
}

export interface Fireplace {
  usage?: FIREPLACE_USAGE;
  fuelDry?: boolean;
  trash: FIREPLACE_TRASH_TYPE[];
  yearlyCleaning?: boolean;
  smoke?: SMOKE_COLOR;
}

export interface Answers {
  postNumber: string;
  age: string;
  gender: string;
  car: Car;
  fireplace: Fireplace;
  electricity: string;
  avoidRushHours?: boolean;
  preferPublicTransportation?: boolean;
  workRemote?: boolean;
}

export interface AnswersValues {
  travel: number;
  burning: number;
  sustainable: number;
}

export interface Quiz {
  cookieId?: string;
  answers: Answers;
  value: number;
}

function calculateCar(car: Car): number {
  let value = 40;
  let ageCoefficient = -7.5;
  let engineCoefficient = 1.5;

  // No answer yet to owning a car
  if (car.owned === undefined) return value / 2;

  // Not owning a car
  if (!car.owned) return value;

  // Owning car
  value -= 10;

  // Car age
  switch (car.year) {
    case CAR_AGE.OLD:
      ageCoefficient = -15;
      break;
    case CAR_AGE.SEMI_OLD:
      ageCoefficient = -10;
      break;
    case CAR_AGE.SEMI_NEW:
      ageCoefficient = -5;
      break;
    case CAR_AGE.NEW:
      ageCoefficient = 0;
      break;
    default:
  }

  // Tires
  value += car.frictionTires === undefined ? 0 : car.frictionTires ? 10 : -10;

  // Engine
  switch (car.engineType) {
    case CAR_FUEL.ELECTRIC:
      engineCoefficient = 1;
      break;
    case CAR_FUEL.GAS:
      engineCoefficient = 1.25;
      break;
    case CAR_FUEL.HYBRID:
      engineCoefficient = 1.5;
      break;
    case CAR_FUEL.PETROL:
      engineCoefficient = 1.75;
      break;
    case CAR_FUEL.DIESEL:
      engineCoefficient = 2;
      break;
    default:
  }

  // Distance
  value -= car.rangePerWeek * 0.05;

  // Passengers
  value += -10 + 5 * Math.min(car.passengers, 5);

  // Apply engine + age coefficients
  value += engineCoefficient * ageCoefficient;

  return Math.max(0, Math.min(40, value));
}

function calculateFireplace(fireplace: Fireplace): number {
  let value = 40;

  // No answer yet to owning a fireplace
  if (fireplace.usage === undefined) return value / 2;

  // Not owning a fireplace
  if (fireplace.usage === FIREPLACE_USAGE.NONE) return value;

  // Owning a fireplace
  switch (fireplace.usage) {
    case FIREPLACE_USAGE.WARMING:
      value -= 10;
      break;
    case FIREPLACE_USAGE.LEISURE:
      value -= 20;
      break;
    case FIREPLACE_USAGE.BOTH:
      value -= 30;
      break;
    default:
  }

  // Dry firewood
  value -= fireplace.fuelDry === undefined ? 7.5 : fireplace.fuelDry ? 0 : 15;

  // Cleaning
  value -=
    fireplace.yearlyCleaning === undefined
      ? 5
      : fireplace.yearlyCleaning
      ? 0
      : 10;

  // Trash
  fireplace.trash.map((trash) => {
    let points = 10;
    if (trash === FIREPLACE_TRASH_TYPE.PAPER) points = 5;
    if (trash === FIREPLACE_TRASH_TYPE.PLASTIC) points = 20;
    value -= points;
  });

  // Smoke
  switch (fireplace.smoke) {
    case SMOKE_COLOR.BLACK:
      value -= 20;
      break;
    case SMOKE_COLOR.LIGHT:
      break;
    case SMOKE_COLOR.GREY:
    default:
      value -= 10;
      break;
  }

  return Math.max(0, Math.min(40, value));
}

export function getAirQualityIndex(answers: Answers): number {
  let value = 0;

  value += calculateCar(answers.car);
  value += calculateFireplace(answers.fireplace);

  value +=
    answers.electricity === ''
      ? 1
      : answers.electricity === ELECTRICITY.MIXED
      ? 0
      : 2;
  value +=
    answers.avoidRushHours === undefined ? 3 : answers.avoidRushHours ? 6 : 0;
  value +=
    answers.preferPublicTransportation === undefined
      ? 3
      : answers.preferPublicTransportation
      ? 6
      : 0;
  value += answers.workRemote === undefined ? 3 : answers.workRemote ? 6 : 0;

  return Math.min(100, Math.max(1, value));
}

export function getDetailedAirQualityIndex(answers: Answers): AnswersValues {
  return {
    travel: 40 - calculateCar(answers.car),
    burning: 40 - calculateFireplace(answers.fireplace),
    sustainable:
      20 -
      ((answers.electricity === ''
        ? 1
        : answers.electricity === ELECTRICITY.MIXED
        ? 0
        : 2) +
        (answers.avoidRushHours === undefined
          ? 3
          : answers.avoidRushHours
          ? 6
          : 0) +
        (answers.preferPublicTransportation === undefined
          ? 3
          : answers.preferPublicTransportation
          ? 6
          : 0) +
        (answers.workRemote === undefined ? 3 : answers.workRemote ? 6 : 0)),
  };
}
