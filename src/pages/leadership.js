import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import SubpageHero from '../components/hero-subpage/subpage-hero'
import PageBody from '../components/page-body/page-body'

const IndexPage = ({data}) => {
  return (
    <Layout page="leadership">
      <SEO title="Leadership - skylytics" description="Site description" />
      <SubpageHero imgData={data.file.childImageSharp.fluid} pageTitle="Executive Leaderhip Team" />
      <PageBody bodyData={data.allLeadershipJson.edges} />
    </Layout>
  )
}

export const LeadershipPageQuery = graphql`
query LeadershipPageQuery {
  allLeadershipJson {
    edges {
      node {
        name
        bio
        image {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        linkedin
        position
        twitter
      }
    }
  }
  file(relativePath: {eq: "components/leadership/bg/leadership_background.jpg"}) {
    childImageSharp {
      fluid(quality: 90, maxWidth: 1920) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
}`

export default IndexPage
