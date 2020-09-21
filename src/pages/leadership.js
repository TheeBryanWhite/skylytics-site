import React, {useEffect} from 'react'
import {graphql} from 'gatsby'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from "../redux/actions/actions"

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'
import Leadership from '../components/page-body-child-leadership/leadership'

const LeadershipPage = ({data}) => {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setCurrentPage('leadership'))
  })
  
  return (
    <Layout page="leadership">
      <SEO title="Skylytics | Leadership" description="Meet your Skylytics Continuous Intelligence professionals" />
      <SubpageHero imgData={data.prismicPage.data.hero.localFile.childImageSharp.fluid} pageTitle={data.prismicPage.data.page_title.text} />
      <PageBody>
        <Leadership bodyData={data.allPrismicLeadersBodyLeaders.edges[0].node} />
      </PageBody>
    </Layout>
  )
}

export const leadershipPageQuery = graphql`
query leadershipPageQuery {
  prismicPage(uid: {eq: "leadership"}) {
		id
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
export default LeadershipPage