/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all Pages with their IDs and template data.
  const news = await graphql(`
    {
      allPrismicNews {
        nodes {
          id
          data {
            template
          }
          uid
        }
		  }
    }
  `)

  const partners = await graphql(`
    {
      allPrismicCampaignTemplate {
        nodes {
          id
          uid
        }
      }
    }
  `)

  const pageTemplate = {
    News: path.resolve(__dirname, 'src/templates/news.js'),
    Partners: path.resolve(__dirname, 'src/templates/partners.js'),
  }

  // Create pages for each Page in Prismic using the selected template.
  news.data.allPrismicNews.nodes.forEach((node) => {
    createPage({
      path: `/${node.uid}`,
      component: pageTemplate.News,
      context: {
        uid: node.uid,
      },
    })
  })

  partners.data.allPrismicCampaignTemplate.nodes.forEach((node) => {
    createPage({
      path: `/partners/${node.uid}`,
      component: pageTemplate.Partners,
      context: {
        uid: node.uid,
      },
    })
  })
}