import { AGE, GENDER } from './Types';
import { Quiz } from './Quiz';

export interface State {
  airQualityIndex: Quiz;
}

export const DEFAULT: State = {
  airQualityIndex: {
    answers: {
      postNumber: '00000',
      age: AGE.NOT_SELECTED,
      gender: GENDER.NOT_SELECTED,
      car: {
        year: 'not-applicable',
        engineType: 'not-applicable',
        rangePerWeek: 0,
        passengers: 1,
      },
      fireplace: {
        fuelDry: undefined,
        trash: [],
        smoke: undefined,
        yearlyCleaning: undefined,
      },
      electricity: '',
    },
    value: 50,
  },
};
