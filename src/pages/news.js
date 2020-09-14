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
			<SubpageHero imgData={data.file.childImageSharp.fluid} pageTitle="Newsroom" pageSubtitle="Stay up-to-date on our latest innovations and partnerships" />
			<PageBody>
				<NewsIndex pageBody={data.allPrismicNews.nodes} />
			</PageBody>
		</Layout>
	)
}

export const NewsPageQuery = graphql`
	query NewsPageQuery {
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
				last_publication_date(formatString: "MMMM DD, YYYY")
			}
		}
		file(relativePath: {eq: "components/news/bg/news-bg.jpg"}) {
			childImageSharp {
				fluid(quality: 90, maxWidth: 1920) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}`

export default IndexPage