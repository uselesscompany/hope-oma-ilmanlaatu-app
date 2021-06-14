module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      '/actions/sustainable': { page: '/actions/[[...action]]' },
      '/actions/travel': { page: '/actions/[[...action]]' },
      '/actions/burning': { page: '/actions/[[...action]]' },
    };
  },
  trailingSlash: true,
};
