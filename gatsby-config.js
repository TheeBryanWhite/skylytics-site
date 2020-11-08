module.exports = {
  siteMetadata: {
    author: 'ThreePoint Collective',
    description: 'The primary website for Skylytics Data, LLC',
    menuLinks: [
      {
        class: 'home',
        name: 'Home',
        link: '/'
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
      // {
      //   class: 'login',
      //   name: 'Login',
      //   link: '/'
      // },
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
      // {
      //   name: 'Facebook',
      //   url: 'https://www.facebook.com/Skylytics-Data-LLC-101495944931186'
      // },
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
    {
      resolve: "gatsby-plugin-guess-js",
      options: {
        GAViewID: `229262866`,
        jwt: {
          client_email: "skylytics@skylytics-guess-js.iam.gserviceaccount.com",
          private_key: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDRzKJn3UqupApH\nuWuvfUZS5i6QwNH7EyabzZM4CH0Ozk8dY/T4XKUwEUxGFgn1z4vm5pXX3zbZYNwz\n3wNw6i1Fg3euxxy8hOpBRdIRsf0hvTkcll/es/BU7VeMF8H2UtjPbDJqLiYutW/G\nyb+hCP52Az/aqhvId8uqQF+Z/AoXU28c1klIntX+vEy9u5ib9hhZjoTKjiN55Oxr\nbQMTaxPhW+Zsd7xtJqJvEnyYYqSUZ+REPePh2LoibwrG5y7rNbmyBM1pFgXHeUq+\n6Pj6z/9EzQyjHORbaBYKjmMMSFY6mgEQv6ZYOgxaCTTXkmSeQrYS0KYjb6MJD+Mf\nZ364bn3/AgMBAAECgf9uikX0EUwqpH7thqdUALd5MWxXid57xELErUdQl0/DOGbZ\nbhYknqvNFBUSOuzw3BFajcFlyyyHcCjkjjA4HQNa9ZFetrHZti58IhxbwE6pH53a\nVJvzsWUg5BRGituKHvVEywI7UlCQ1ZIFhAwu1tM8DBfKFNbxIbdLGoww7pF2Qby3\nCjGEl60MEeNVlhDNLoS0so/Pm90QR8brT6YU0TRvIBMJjKdexd81beQN3EqMvUcW\nzpWhP3UK3WbmaRoYQdwL/xbNg3UD+6PHkmtbMEiAu3jz52YeQ58aBcPDeZ05U1TM\nQrkji3liKe0NBs0w0ZSlJ6NoveMhojTIa2V9wxECgYEA6eQ+cUNVTFdKe5vgQJgE\nLbkqnoQ2N4gD0giPW8w4KnmsdvWEbmKmM3C5G6JKEgp1b90TapN7a46hbte7qDer\nxKHjTKOjsCq/KZDBPT79i+MlfovkDau1PsWUDOprtyAfibDmQhf1kmLHqThPJMJg\n7dmuBVkIZ6lK0u73OWfMDI8CgYEA5aFm5AdMrG103B4cIst8qRHbCJE02A3t0KVF\ni4ZCgEAmxO1oikUcerU3+evWXaPy7ZyDDfl+yxHqHEVexCeUQ3fp6dRvbqsAkZuv\nyXKMG+7NDJunax61mQnxLGtHkzE4z3dmFutNKuZ/OXVOeqWi2tVEQK2msAt96Fhr\n17JxD5ECgYAqgFxMbqTgY3hYb+HXOwh/WoeBGJtVifTPxNhwIPMP3N5XG5Q+DtUO\nwewRNnNpRddDRZQSqMwjpl51auRh1AP1jklkktPa3lmwbup+e6TNN7CHh1ogldQw\nnOyjUDHUrBSvC6M73Wi1ehe4C1BuaJf+gLDbresWEzBSljP8jX0JxwKBgQDjOhLJ\npFt/6JQR2Q24dKm3175pvN6QyT/CDjlCNqoJpPF4PwEKihcDad2pRnEKmliiPhUF\nOBT6t5B1R0PeUNgK51cllpxp43cdnvSVH+97GJP5XPGPM4U5mjf333SlN7jiu2Df\nXxouUIYmgmkVPmBnsU/nvK5MWCLQTubwO1hbsQKBgGQxJ/nayKsEYJske65vNVts\nUxYHODUGVMQ05csDvmgzMD/P0ejCKzkKWLiFr0WcPziGY9SBcPzkwRuwe9yGIe+k\niW8VvHQeWEgcJfcMwsHvV5J3o4pJ3QTfPSuIjepOMFS2/Rc+52bmYrPNa5fbhl+D\nw9vy/icq6Ey1MpN0VEbI\n-----END PRIVATE KEY-----\n",
        },
        minimumThreshold: 0.03,
        period: {
          startDate: new Date("2018-1-1"),
          endDate: new Date(),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-54CC3K3',
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "gatsby-route-change",
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ThreePoint Collective Starter',
        short_name: 'ThreePoint',
        start_url: '/',
        background_color: '#000',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/images/triangle.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [
          '/preview',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: '',
        policy: [{
          userAgent: '*',
          allow: '/',
          disallow: '/site-mailer'
        }],
        output: '/robots.txt',
        sitemap: ''
      },
    },    
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
