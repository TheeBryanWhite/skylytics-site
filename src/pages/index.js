import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import Hero from '../components/hero/hero'
import ElevatorPitch from '../components/elevator-pitch/elevatorpitch'
import CaseStories from '../components/case-stories/case-stories'
import Toolkit from '../components/toolkit/toolkit'
import Leadership from '../components/leadership/leadership'
import Contact from '../components/contact/contact'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" description="Site description" />
      <Hero />
      <ElevatorPitch />
      <CaseStories storyData={data.allCaseStoriesYaml.edges} />
      <Toolkit solutionsData={data.allToolkitYaml.edges} />
      <Leadership />
      <Contact />
    </Layout>
  )
}

export const theBigQuery = graphql`
  query csCopyQuery {
    allCaseStoriesYaml {
      edges {
        node {
          content {
            title
            excerpt
            body {
              paragraph
            }
            link
          }
        }
      }
    }
    allToolkitYaml {
      edges {
        node {
          content {
            title
            options {
              option {
                body
                name
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
