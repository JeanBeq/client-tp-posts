export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss'],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql'
      }
    },
  },

  compatibilityDate: '2024-11-25',
})