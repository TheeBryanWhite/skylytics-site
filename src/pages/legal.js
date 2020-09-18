import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'

const IndexPage = ({data}) => {
  return (
    <Layout page="legal">
      <SEO title="legal - skylytics" description="Site description" />
      <SubpageHero imgData={data.prismicPage.data.hero.localFile.childImageSharp.fluid} pageTitle={data.prismicPage.data.page_title.text} />
      <PageBody>
		<div className="container">
			<article className="wysiwyg">
		  		<div dangerouslySetInnerHTML={{ __html: data.prismicPage.data.page_content.html }} />
		  	</article>
		</div>
      </PageBody>
    </Layout>
  )
}

export default IndexPage

export const leadershipPageQuery = graphql`
query legalPageQuery {
	prismicPage(uid: {eq: "online-privacy-policy-agreement"}) {
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
		  page_content {
			html
		  }
		}
	  }
}
`
