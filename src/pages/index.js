import React, {useEffect} from 'react'
import { graphql } from 'gatsby'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from "../redux/actions/actions"

import Layout from '../components/layout/layout'
import Hero from '../components/hero/hero'
import ElevatorPitch from '../components/elevator-pitch/elevatorpitch'
import CaseStories from '../components/case-stories/case-stories'
import Toolkit from '../components/toolkit/toolkit'
import Leadership from '../components/leadership/leadership'
import Contact from '../components/contact/contact'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentPage('home'))
  })

  return (
    <Layout page="home">
      <SEO title="Skylytics | Home" description="Skylytics brings clarity to your business by acting as the bridge between continuous intelligence technology and you" />
      <Hero heroBody={data.allPrismicHomepageHero.edges[0].node.data} />
      <ElevatorPitch aboutUsBody={data.allPrismicAboutUs.edges[0].node.data} />
      <CaseStories 
        storyMeta={data.allPrismicCaseStories.edges[0].node.data}
        storyBody={data.allPrismicCaseStoriesBodyCaseStoriesHead.edges}
      />
      <Toolkit
        solutionsMeta={data.allPrismicSolutions.edges[0].node.data}
        solutionsBody={data.allPrismicSolutionsBodySolution.edges}
      />
      <Leadership
        leadershipMeta={data.allPrismicLeaders.edges[0].node.data}
        leadershipBody={data.allPrismicLeadersBodyLeaders.edges[0].node.items}
      />
      <Contact contactUsBody={data.allPrismicContactUs.edges[0].node.data} />
    </Layout>
  )
}



export const theBigQuery = graphql`
  query csCopyQuery {
    allPrismicCaseStories {
      edges {
        node {
          data {
            header {
              html
            }
            footer {
              html
            }
          }
        }
      }
    }
    allPrismicCaseStoriesBodyCaseStoriesHead(sort: {fields: id, order: ASC}) {
      edges {
        node {
          items {
            bw_image {
              alt
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            color_image {
              alt
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            excerpt {
              html
            }
            story_body {
              html
            }
          }
          id
        }
      }
    }
    allPrismicSolutions {
      edges {
        node {
          data {
            header {
              html
            }
          }
        }
      }
    }
    allPrismicSolutionsBodySolution(sort: {fields: id, order: ASC}) {
      edges {
        node {
          id
          items {
            subtab_body {
              html
            }
            subtab_label {
              text
            }
          }
          primary {
            button_label {
              text
            }
            image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              alt
            }
          }
        }
      }
    }
    allPrismicLeadersBodyLeaders(sort: {fields: id, order: ASC}, filter: {items: {elemMatch: {feature_on_homepage: {eq: true}}}}) {
      edges {
        node {
          id
          items {
            bio {
              html
            }
            name {
              text
            }
            position {
              text
            }
            feature_on_homepage
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
            twitter {
              target
              url
            }
          }
        }
      }
    }
    allPrismicLeaders {
      edges {
        node {
          data {
            leadership_section_header {
              html
            }
            background_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicContactUs {
      edges {
        node {
          data {
            demo {
              html
            }
            demo_title {
              text
            }
            footer {
              html
            }
            header {
              html
            }
            newsletter {
              html
            }
          }
        }
      }
    }
    allPrismicHomepageHero {
			edges {
				node {
					data {
						hero_slides {
							hero_body {
								html
							}
							hero_background_image {
								localFile {
                  childImageSharp {
                    fluid (maxWidth: 2500) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
							}
            }
          }
        }
      }
    }
    allPrismicAboutUs {
      edges {
        node {
        data {
          about_us_body {
          html
          }
          body {
          ... on PrismicAboutUsBodyCta {
            id
            primary {
            link {
              text
            }
            title {
              text
            }
            }
          }
          }
          background_image {
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
  }
`

export default IndexPage