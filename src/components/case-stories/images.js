import React from 'react'
import {
	graphql,
	useStaticQuery
} from 'gatsby'
import Img from "gatsby-image"
import { connect } from "react-redux"
import { 
	caseStoryCycle,
	selectedStory,
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

		if (props.chosenStory === null && props.activeStory === story) {
			classOutput = 'story-img active-image'
		} else if (props.chosenStory === story) {
			classOutput = 'story-img active-image'
		} else {
			classOutput = 'story-img'
		}

		return classOutput
	}

	const mouseEnterHandler = story => {
		if (props.selectedStory === null) {
			props.caseStoryCycle({'animate': false, 'activeStory': story})
		}
	}
	
	const mouseLeaveHandler = story => {
		if (props.selectedStory === null) {
			props.caseStoryCycle({'animate': true, 'activeStory': story})
		}
	}

	const setSelectedStory = story => {
		props.selectedStory({'activeStory': story, 'animate': false, 'selectedStory': story})
	}
	
	return(
		<div className="column story-options">
			{
				csImgData.allCaseStoriesYaml.edges.map((story, index) => (
				<div
					className={imageClassHandler(index)} 
					id={`story-${index}`} 
					key={index}
					onClick={() => { setSelectedStory(index) }}
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
	chosenStory: state.app.selectedStory

})

export default connect(
	mapStateToProps,
	{ 
		selectedStory,
		setActiveStory,
		caseStoryCycle
	})(Images)