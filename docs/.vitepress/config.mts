import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vulkan Tutorial",
  description: "Vulkan tutorial for begineer | written in Rust",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Rust', link: '/rust' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      "rust": [
        {
          text: 'Introduction', link: '/rust'
        },
        {
          text: 'Overview', link: '/rust/overview'
        },
        {
          text: 'Tutorial Overview', link: '/rust/tutorial-overview'
        },
        {
          text: 'Development environment setup', link: '/rust/dev-env-setup'
        },
        {
          text: 'Glossary', link: '/rust/glossary'
        },
        // {
        //   text: 'Chapter 1',
        //   items: [
        //     { text: 'Markdown Examples', link: '/rust/markdown-examples' },
        //     { text: 'Runtime API Examples', link: '/rust/api-examples' }
        //   ]
        // }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/vulkantutorial-rust-code' }
    ]
  }
})
