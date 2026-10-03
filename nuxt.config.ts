import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Alex Chen — Notes on making things',
      meta: [
        { name: 'description', content: 'The personal site of Alex Chen: a designer and front-end engineer writing about thoughtful digital work.' },
      ],
    },
  },
})
