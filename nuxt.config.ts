import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '~/assets/css/library.css', '~/assets/css/preferences.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Alex Chen — AI research & technology',
      script: [{
        key: 'initial-color-mode',
        innerHTML: `(()=>{const match=document.cookie.match(/(?:^|; )site-theme=([^;]*)/);const mode=match?decodeURIComponent(match[1]):'system';const dark=mode==='dark'||(mode!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light'})()`,
      }],
      meta: [
        { name: 'description', content: 'Notes on AI research, model evaluation, and building useful technology.' },
      ],
    },
  },
})
