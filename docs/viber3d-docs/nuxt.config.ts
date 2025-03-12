// Configuration for Viber3D documentation
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-03-11',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  }

  // llms: {
  //   domain: 'https://viber3d.instructa.ai/',
  //   title: 'Viber3D Documentation',
  //   description:
  //     'Documentation for Viber3D - A modern 3D game starter kit for the web',
  //   full: {
  //     title: 'Viber3D Full Documentation',
  //     description:
  //       'This is the full documentation for the Viber3D game engine'
  //   },
  //   sections: [
  //     {
  //       title: 'Getting Started',
  //       contentCollection: 'docs',
  //       contentFilters: [
  //         { field: 'path', operator: 'LIKE', value: '/getting-started%' }
  //       ]
  //     },
  //     {
  //       title: 'Core Concepts',
  //       contentCollection: 'docs',
  //       contentFilters: [
  //         { field: 'path', operator: 'LIKE', value: '/core-concepts%' }
  //       ]
  //     },
  //     {
  //       title: 'Development',
  //       contentCollection: 'docs',
  //       contentFilters: [
  //         { field: 'path', operator: 'LIKE', value: '/development%' }
  //       ]
  //     }
  //   ]
  // }
})
