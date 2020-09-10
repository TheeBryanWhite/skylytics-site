module.exports = {
  siteMetadata: {
    author: 'ThreePoint Collective',
    description: 'The primary website for Skylytics Data, LLC',
    menuLinks: [
      {
        class: 'home',
        name: 'Home',
        link: '/#top'
      },
      {
        class: 'about-us',
        name: 'About Us',
        link: '/#about-us'
      },
      {
        class: 'case-stories',
        name: 'Case Stories',
        link: '/#case-stories'
      },
      {
        class: 'tool-kit',
        name: 'Toolkit',
        link: '/#toolkit'
      },
      {
        class: 'leadership',
        name: 'Leadership',
        link: '/#leadership'
      },
      {
        class: 'news',
        name: 'news',
        link: '/#news'
      },
      {
        class: 'contact-us',
        name: 'Contact Us',
        link: '/#contact-us'
      },
      {
        class: 'login',
        name: 'Login',
        link: '/'
      },
    ],
    address: {
      address1: '402 Amherst St.',
      address2: 'Suite 303',
      city: 'Nashua',
      state: 'NH',
      zip: '03063',
      phone: '(603) 460-4496',
      contact: 'info@safercontact.com',
    },
    socialMedia: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/skylytics-data-llc/'
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/Skylytics-Data-LLC-101495944931186'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/SkyLyticsD8a'
      }
    ],
    siteUrl: 'https://localhost:3000',
    title: 'Skylytics Data, LLC',
  },
  plugins: [
    'gatsby-background-image',
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Avenir"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    // Uncomment when Prismic repo is setup
    // {
    //   resolve: 'gatsby-source-prismic-graphql',
    //     options: {
    //       accessToken: '',
    //       omitPrismicScript: true,
    //       repositoryName: '',
    //   }
    // },
    // Uncomment when in production
    // {
    //   resolve: 'gatsby-plugin-google-tagmanager',
    //   options: {
    //     id: '',
    //     includeInDevelopment: false,
    //     defaultDataLayer: { platform: "gatsby" },
    //     routeChangeEventName: "gatsby-route-change",
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: 'ThreePoint Collective Starter',
    //     short_name: 'ThreePoint',
    //     start_url: '/',
    //     background_color: '#000',
    //     theme_color: '#fff',
    //     display: 'minimal-ui',
    //     icon: 'src/images/triangle.png', // This path is relative to the root of the site.
    //   },
    // },
    // 'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    // {
    //   resolve: 'gatsby-plugin-sitemap',
    //   options: {
    //     exclude: [
    //       '/preview',
    //     ],
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-robots-txt',
    //   options: {
    //     host: '',
    //     policy: [{
    //       userAgent: '*',
    //       allow: '/',
    //       disallow: '/site-mailer'
    //     }],
    //     output: '/robots.txt',
    //     sitemap: ''
    //   },
    // },    
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/ // See below to configure properly
        }
      }
    },
    'gatsby-plugin-transition-link',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'source',
        path: `${__dirname}/src`,
      },
    },
    'gatsby-transformer-sharp'
  ],
}
