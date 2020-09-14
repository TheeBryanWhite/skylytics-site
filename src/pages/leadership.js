import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'
import Leadership from '../components/page-body-child-leadership/leadership'

const IndexPage = ({data}) => {
  return (
    <Layout page="leadership">
      <SEO title="Leadership - skylytics" description="Site description" />
      <SubpageHero imgData={data.file.childImageSharp.fluid} pageTitle="Executive Leaderhip Team" />
      <PageBody>
        <Leadership bodyData={data.allLeadershipJson.edges} />
      </PageBody>
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
            fluid(quality: 90, maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp
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
