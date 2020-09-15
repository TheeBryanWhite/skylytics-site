import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'
import Leadership from '../components/page-body-child-leadership/leadership'

const IndexPage = ({data}) => {
  return (
    <Layout page="leadership">
      <SEO title="Leadership - skylytics" description="Site description" />
      <SubpageHero imgData={data.allPrismicPage.edges[0].node.data.hero.localFile.childImageSharp} pageTitle={data.allPrismicPage.edges[0].node.data.page_title.text} />
      <PageBody>
        <Leadership bodyData={data.allPrismicLeadersBodyLeaders.edges[0].node} />
      </PageBody>
    </Layout>
  )
}

export default IndexPage

export const leadershipPageQuery = graphql`
query leadershipPageQuery {
  allPrismicPage {
    edges {
      node {
        data {
          page_title {
            text
          }
          hero {
            localFile {
              childImageSharp {
                fluid (maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
  allPrismicLeadersBodyLeaders {
    edges {
      node {
        items {
          bio {
            html
          }
          headshot {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          linkedin {
            url
            target
          }
          name {
            text
          }
          position {
            text
          }
          twitter {
            url
            target
          }
        }
      }
    }
  }
}
`
