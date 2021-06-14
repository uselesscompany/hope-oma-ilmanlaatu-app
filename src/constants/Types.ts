export enum CAR_FUEL {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  GAS = 'gas',
}

export enum CAR_AGE {
  NEW = 'new',
  SEMI_NEW = 'semi-new',
  SEMI_OLD = 'semi-old',
  OLD = 'old',
}

export enum FIREPLACE_TRASH_TYPE {
  PAPER = 'paper',
  CARTON = 'carton',
  PLASTIC = 'plastic',
  CONSTRUCTION = 'construction',
  OTHER = 'other',
}

export const FIREPLACE_TRASH: FIREPLACE_TRASH_TYPE[] = [
  FIREPLACE_TRASH_TYPE.PAPER,
  FIREPLACE_TRASH_TYPE.CARTON,
  FIREPLACE_TRASH_TYPE.PLASTIC,
  FIREPLACE_TRASH_TYPE.CONSTRUCTION,
  FIREPLACE_TRASH_TYPE.OTHER,
];

export enum ELECTRICITY {
  MIXED = 'mix',
  RENEWABLE = 'renewable',
  NUCLEAR = 'nuclear',
}

export enum AGE {
  NOT_SELECTED = 'not-selected',
  L10 = 'L10',
  L20 = 'L20',
  L30 = 'L30',
  L40 = 'L40',
  L50 = 'L50',
  L60 = 'L60',
  L70 = 'L70',
}

export enum GENDER {
  NOT_SELECTED = 'not-selected',
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'other',
}
