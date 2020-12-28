import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'

import './scss/news.scss'

function NewsPostTemplate({data}) {
	const post = data.prismicNews
	const page = data.prismicPage

	return(
		<Layout page="news">
			<SEO title="News - skylytics" description="Site description" />
			<SubpageHero imgData={page.data.hero.localFile.childImageSharp.fluid} pageTitle={post.data.news_title.text} />
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
query PostBySlug {
	prismicPage(uid: {eq: "newsroom"}) {
		id
		data {
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
	  allPrismicNews(sort: {fields: [first_publication_date], order: DESC}) {
		edges {
		  node {
			first_publication_date(formatString: "MMMM DD, YYYY")
			last_publication_date
			uid
			data {
			  news_body {
				html
				raw
				text
			  }
			  news_category
			  news_hero_image {
				fluid {
				  src
				}
			  }
			  news_title {
				html
				raw
				text
			  }
			}
		  }
		}
	  }
}
`

export default NewsPostTemplate