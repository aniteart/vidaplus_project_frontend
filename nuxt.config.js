export default {
  target: 'server',

  head: {
    title: 'Vida Plus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          '@tailwindcss/postcss': {},
          autoprefixer: {},
        },
      },
    },
  },

  modules: ['bootstrap-vue/nuxt'],

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
};
