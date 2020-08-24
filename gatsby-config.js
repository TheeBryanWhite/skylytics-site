module.exports = {
  siteMetadata: {
    author: 'ThreePoint Collective',
    description: 'Boilerplate starter project for ThreePoint Collective web projects',
    menuLinks: [
      {
        class: '',
        name: '',
        link: ''
      }
    ],
    phone: '(555) 555-5555',
    siteUrl: 'https://localhost:3000',
    title: 'ThreePoint Gatsby Starter',
  },
  plugins: [
    'gatsby-background-image',
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
    // 'gatsby-plugin-react-helmet',
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
    'gatsby-plugin-transition-link',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
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
