import React from 'react'
import {
	graphql,
	useStaticQuery
} from 'gatsby'
import Img from "gatsby-image"
import { connect } from "react-redux"
import { setActiveStory } from "../../redux/actions/actions"

import './case-stories.scss'

const Images = props => {
	const csImgData = useStaticQuery(graphql`
		query csImgQuery {
			allCaseStoriesYaml {
				edges {
					node {
						content {
							title
							src {
								childImageSharp {
									fluid(maxWidth: 600) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	`)
	
	return(
		<div className="column story-options">
			{
				csImgData.allCaseStoriesYaml.edges.map((story, index) => (
				<div className={`story-img ${(props.activeStory === index ? 'active-image' : '')}`} id={`story-${index}`} key={index}>
					<Img fluid={story.node.content.src.childImageSharp.fluid} alt={story.node.content.title} />
				</div>
				))
			}
		</div>
	)
}

const mapStateToProps = state => ({
    activeStory: state.app.activeStory
})

export default connect(mapStateToProps, { setActiveStory })(Images)