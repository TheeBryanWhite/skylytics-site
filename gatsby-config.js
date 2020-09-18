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
        class: 'solutions',
        name: 'Solutions',
        link: '/#solutions'
      },
      {
        class: 'leadership',
        name: 'Leadership',
        link: '/leadership'
      },
      {
        class: 'news',
        name: 'News',
        link: '/news'
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
      contact: 'info@skylytics.com',
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
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'skylytics',
        accessToken: 'MC5YdXY2SmhJQUFORE5yaGQx.77-977-9b--_vU3vv71H77-977-977-977-9Me-_ve-_vT3vv70NC--_ve-_ve-_ve-_ve-_vT_vv70AbO-_ve-_ve-_ve-_vQM',
        linkResolver: ({ node, key, value }) => (doc) => {
          if (doc.type === 'news') return "/news/" + doc.uid;
          if (doc.type === 'page') return "/" + doc.uid;

          return "/doc/" + doc.id;
        },
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children,
        ) => {
          
        },
        // Remember, the schema names in the object have to match the API ID
        schemas: {
          news: require('./src/schemas/news.json'),
          page: require('./src/schemas/page.json'),
          homepage_hero: require('./src/schemas/homepage-hero.json'),
          about_us: require('./src/schemas/about-us.json'),
          case_stories: require('./src/schemas/case-stories.json'),
          solutions: require('./src/schemas/solutions.json'),
          leaders: require('./src/schemas/leadership.json'),
          contact_us: require('./src/schemas/contact-us.json')
        },
        shouldDownloadImage: ({ node, key, value }) => {
          return true
        },
      },
    },
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
          include: /svg/
        }
      }
    },
    'gatsby-plugin-transition-link',
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
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
