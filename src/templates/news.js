import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'

import './scss/news.scss'

function NewsPostTemplate({data}) {
	const post = data.prismicNews

	return(
		<Layout page="news">
			<SEO title="News - skylytics" description="Site description" />
			<SubpageHero imgData={post.data.news_hero_image.fluid} pageTitle={post.data.news_title.text} />
			<PageBody>
				<article>
					<div className="container wysiwyg">
						<p className="post-date">{post.first_publication_date}</p>
						<p className="post-category">{post.data.news_category}</p>

						<div dangerouslySetInnerHTML={{ __html: post.data.news_body.html }} />
					</div>
				</article>
			</PageBody>
		</Layout>
	)
}

export const query = graphql`
query PostBySlug($uid: String!) {
	prismicNews(uid: {eq: $uid}) {
		data {
			news_body {
				html
			}
			news_category
			news_hero_image {
				fluid {
					src
				}
			}
			news_title {
				text
			  }
		}
		first_publication_date(formatString: "MMMM DD, YYYY")
	}
}
`

export default NewsPostTemplate