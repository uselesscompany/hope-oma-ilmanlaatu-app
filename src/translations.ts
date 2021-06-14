import en from 'locales/en/common.json';
import fi from 'locales/fi/common.json';

export enum Languages {
  en = 'en',
  fi = 'fi',
}

const translations: { [key in keyof typeof Languages]: typeof fi } = {
  en: en,
  fi: fi,
};

export default translations;
