import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'
import NewsIndex from '../components/news/news-index'

const IndexPage = ({data}) => {
	return(
		<Layout page="news">
			<SEO title="News - skylytics" description="Site description" />
			<SubpageHero
				imgData={data.prismicPage.data.hero.localFile.childImageSharp.fluid} 
				pageTitle="Newsroom" 
				pageSubtitle="Stay up-to-date on our latest innovations and partnerships"
			/>
			<PageBody>
				<NewsIndex pageBody={data.allPrismicNews.nodes} />
			</PageBody>
		</Layout>
	)
}

export const NewsPageQuery = graphql`
query newsPageQuery {
	prismicPage(uid: {eq: "newsroom"}) {
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
allPrismicNews {
    nodes {
      id
      data {
        news_category
        news_excerpt {
          text
        }
        news_hero_image {
          fluid {
            src
          }
        }
        news_title {
          text
        }
      }
      uid
      first_publication_date(formatString: "MMMM DD, YYYY")
    }
  }
}
  `

export default IndexPage