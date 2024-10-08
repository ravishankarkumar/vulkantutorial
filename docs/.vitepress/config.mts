import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vulkan Tutorial",
  description: "Vulkan tutorial for begineer | written in Rust",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Rust (Currently unfinished, WIP)', link: '/rust' },
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
          text: 'Befriending Vulkan',
          items: [
            { text: 'Getting Started', link: '/rust/befriending-vulkan/introduction' },
            {
              text: 'Instance', items: [
                { text: 'Basic Instance creation', link: '/rust/befriending-vulkan/instance/instance-basic' },

                { text: 'Better Instance creation', link: '/rust/befriending-vulkan/instance/instance-cross-platform' }
              ]
            },
            { text: 'Validation Layers', link: '/rust/befriending-vulkan/validation-layers' },
            { text: 'Physical Device and Queue families', link: '/rust/befriending-vulkan/physical-device-queue-family' },
            // { text: 'Runtime API Examples', link: '/rust/api-examples' }
          ]
        },
        // {
        //   text: 'Creating a window',
        //   items: [
        //     { text: 'Introduction', link: '/rust/creating-window/winit' },
        //     // { text: 'Runtime API Examples', link: '/rust/api-examples' }
        //   ]
        // },
        {
          text: 'Glossary', link: '/rust/glossary'
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/vulkantutorial-rust-code' }
    ]
  }
})
