import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import SubpageHero from '../components/hero-subpage/subpage-hero'

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Leadership - skylytics" description="Site description" />
      <SubpageHero imgData={data.file.childImageSharp.fluid} pageTitle="Executive Leaderhip Team" />
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
            fluid(maxWidth: 300) {
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
