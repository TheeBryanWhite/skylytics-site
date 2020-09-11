import React from 'react'
import {
	graphql,
	useStaticQuery
} from 'gatsby'
import Img from "gatsby-image"
import { connect } from "react-redux"
import { 
	caseStoryCycle,
	setSelectedStory,
	setExpandedStory,
	setActiveStory
} from "../../redux/actions/actions"

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

	const imageClassHandler = story => {
		let classOutput = null

		if (props.selectedStory === null && props.activeStory === story) {
			classOutput = 'story-img active-image'
		} else if (props.selectedStory === story) {
			classOutput = 'story-img active-image'
		} else {
			classOutput = 'story-img'
		}

		return classOutput
	}

	const clickHandler = story => {
		props.setSelectedStory(story)
		props.setActiveStory(story)
		props.setExpandedStory(null)
	}

	const mouseEnterHandler = story => {
		if (props.selectedStory === null) {
			props.caseStoryCycle(false)
			props.setActiveStory(story)
		}
	}
	
	const mouseLeaveHandler = story => {
		if (props.selectedStory === null) {
			props.caseStoryCycle(true)
			props.setActiveStory(story)
		}
	}
	
	return(
		<div className="column story-options">
			{
				csImgData.allCaseStoriesYaml.edges.map((story, index) => (
				<div
					className={imageClassHandler(index)} 
					id={`story-${index}`} 
					key={index}
					onClick={() => { clickHandler(index) }}
					onMouseEnter={() => { mouseEnterHandler(index) }}
					onMouseLeave={() => {mouseLeaveHandler(index) }}
					role="presentation"
				>
					<Img fluid={story.node.content.src.childImageSharp.fluid} alt={story.node.content.title} />
				</div>
				))
			}
		</div>
	)
}

const mapStateToProps = state => ({
	activeStory: state.app.activeStory,
	caseStoryCycle: state.app.caseStoryCycle,
	expandedStory: state.app.expandedStory,
	selectedStory: state.app.selectedStory

})

export default connect(
	mapStateToProps,
	{ 
		setActiveStory,
		setExpandedStory,
		setSelectedStory,
		caseStoryCycle
	})(Images)