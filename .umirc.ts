import { defineConfig } from 'umi';
//定义你的百度api的key
const BmapApi = 'n7GDsu4PuHcnt3Er3weXUeommL5ItQR1';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    // '/myphp': {
    //   'target': 'http://localhost/menu/myphp',
    //   'changeOrigin': true,
    //   'pathRewrite': { '^/myphp' : '' },
    // },
  },
  copy: ['/public'],
  dynamicImport: {
    loading: '@/component/GLoading',
  },
  //这部分是在文档模板头部添加标签
  headScripts: [
    {
      type: 'text/javascript',
      src: 'http://api.map.baidu.com/api?v=2.0&ak=' + BmapApi,
    },
  ],  
  history: {
    type: 'hash',
  },
  publicPath: './',
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM'
  },
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js'
  ]
});
