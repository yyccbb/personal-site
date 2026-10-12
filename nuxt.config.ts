import tailwindcss from '@tailwindcss/vite'
import { englishContent } from './app/content/site'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '~/assets/css/library.css', '~/assets/css/preferences.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: `${englishContent.profile.displayName} — AI research & technology`,
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
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
