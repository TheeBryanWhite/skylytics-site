import React from 'react'
import {
	graphql,
	Link,
	useStaticQuery
} from 'gatsby'
import Img from "gatsby-image"

import './case-stories.scss'

const CaseStories = () => {
	const csImgData = useStaticQuery(graphql`
		query csImgQuery {
			allFile(filter: {extension: {regex: "/(jpg)/"}, relativeDirectory: {eq: "components/case-stories/img"}}) {
				edges {
					node {
						base
						childImageSharp {
							fluid {
								aspectRatio
								base64
								src
								srcSet
								sizes
							}
						}
					}
				}
			}
		}
	`)

	return (
		<section className="casestories" id="case-stories">
			<div className="columns">
				<div className="column story-options">
					{csImgData.allFile.edges.map(({node}, index) => 
					(
					<div className="story-img" id={`story-${index}`} key={index}>
						<Img fluid={node.childImageSharp.fluid} />
					</div>
					))}
				</div>
				<div className="column story">
					<div className="story-container">
						<div className="story-head">
							<h2>What's your story?</h2>
							<p>Every day we make business decisions off the information available to us; Let us show you how to leverage the power of continuous intelligence to your advantage.</p>
						</div>
						<div className="story-content">
							<h3>Contact Tracing for a Safer Working Environment</h3>
							<p>How do you safely monitor each worker’s person-to-person contact while adhering to state and federal guidelines?</p>
							<ul>
								<li><Link className="cta" to="/">Read More</Link></li>
								<li><a href="/" target="_blank" rel="noopener">Learn more about our Tracing software, safercontact<span>&reg;</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CaseStories