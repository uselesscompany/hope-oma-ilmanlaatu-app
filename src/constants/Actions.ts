export const pages: {
  [key: string]: {
    actions: { name: string; effect: number; link?: string }[];
    iconId: number;
  };
} = {
  sustainable: {
    actions: [
      {
        name: 'route',
        effect: 5,
        link: 'https://green-paths.web.app',
      },
      {
        name: 'light',
        effect: 5,
      },
      {
        name: 'remote',
        effect: 4,
      },
      {
        name: 'renewable',
        effect: 3,
      },
    ],
    iconId: 2,
  },
  travel: {
    actions: [
      {
        name: 'public',
        effect: 4,
      },
      {
        name: 'pool',
        effect: 3,
      },
      {
        name: 'friction',
        effect: 3,
      },
      {
        name: 'energy',
        effect: 3,
      },
      {
        name: 'idle',
        effect: 2,
      },
    ],
    iconId: 1,
  },
  burning: {
    actions: [
      {
        name: 'storing',
        effect: 5,
        link: 'https://www.hsy.fi/poltapuhtaasti',
      },
      {
        name: 'dry',
        effect: 5,
        link: 'https://www.hsy.fi/poltapuhtaasti',
      },
      {
        name: 'fill',
        effect: 4,
        link: 'https://www.hsy.fi/poltapuhtaasti',
      },
      {
        name: 'lighting',
        effect: 4,
        link: 'https://www.hsy.fi/poltapuhtaasti',
      },
      {
        name: 'maintenance',
        effect: 4,
        link: 'https://www.hsy.fi/poltapuhtaasti',
      },
    ],
    iconId: 0,
  },
};
