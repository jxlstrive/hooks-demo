const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // @primary-color 全局主色 @font-size-base 主字号
            modifyVars: { '@primary-color': 'rgb(0, 82, 204)', '@font-size-base': '16px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};