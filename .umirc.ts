import { defineConfig } from 'umi';
export default defineConfig({
  publicPath: './',
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  copy: ['/public'],
});
