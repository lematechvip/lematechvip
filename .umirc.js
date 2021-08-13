const isProduction = process.env.NODE_ENV === 'production';

const menus = require('./formatMenu');
export default {
  title: '乐马技术',
  mode: 'site',
  logo: 'https://cdn.lematech.vip/lematech_logo.svg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  locale: {
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  metas: [
    {
      property: 'og:site_name',
      content: '乐马技术',
    },
    {
      'data-rh': 'keywords',
      property: 'og:image',
      content: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
    },
    {
      property: 'og:description',
      content: '🏆 让中后台开发更简单',
    },
    {
      name: 'keywords',
      content: '中后台,admin,Ant Design,ant design,Table,react,alibaba',
    },
    {
      name: 'description',
      content: '🏆 让中后台开发更简单 包含 table form 等多个组件。',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  // 用于切换 antd 暗黑模式
  // antd: {
  //   dark: true,
  // },
  resolve: {
    includes: ['docs', 'config', 'blog'],
  },
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  navs: {
    'en-US': [
      null,
      {
        title: 'version',
        children: [
          {
            title: 'hrun4j',
            path: 'https://v1.pro.ant.design/',
          },
          {
            title: 'lmcov',
            path: 'https://v2-pro.ant.design/',
          }
        ],
      },
      {
        title: 'GitHub',
        path: 'https://github.com/lematechvip/hrun4j',
      },
    ],
    'zh-CN': [
      null,
      {
        title: '开源项目',
        children: [
          {
            title: 'hrun4j',
            path: 'https://github.com/lematechvip/hrun4j',
          },
          {
            title: 'lmcov',
            path: 'https://github.com/lematechvip/lmcov',
          }
        ],
      },
      {
        title: 'GitHub',
        path: 'https://github.com/lematechvip',
      },
    ],
  },
  analytics: isProduction
    ? {
        ga: 'UA-72788897-5',
      }
    : false,
  hash: true,
  ssr: {},
  exportStatic: {},
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  theme: {
    '@s-site-menu-width': '242px',
  },
  ignoreMomentLocale: true,
  headScripts: ['https://gw.alipayobjects.com/os/antfincdn/fdj3WlJd5c/darkreader.js'],
  externals: { darkreader: 'window.DarkReader' },
  webpack5: {},
  fastRefresh: {},
  lessLoader: {
    test: /\.less$/i,
    loader: [
      // compiles Less to CSS
      'style-loader',
      'css-loader',
      'less-loader',
    ],
  },
  postcssLoader: {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  },
  menus,
};
