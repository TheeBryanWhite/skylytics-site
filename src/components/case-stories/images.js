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
							bw {
								childImageSharp {
									fluid(maxWidth: 900) {
										...GatsbyImageSharpFluid
									}
								}
							}
							color {
								childImageSharp {
									fluid(maxWidth: 900) {
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
		let classArr = ['story-img']

		if (props.selectedStory === null && props.activeStory === story) {
			classArr.push('active-image')
		}
		
		if (props.selectedStory === story) {
			classArr.push('active-image')
		}
		
		if (props.expandedStory === story) {
			classArr.push('expanded-image')
		}

		const classOutput = classArr.join(' ')

		return classOutput
	}

	const colorClassHandler = story => {
		let classArr = ['color-image']

		if (props.selectedStory === null && props.activeStory === story) {
			classArr.push('active-image')
		}
		
		if (props.selectedStory === story) {
			classArr.push('active-image')
		}
		
		if (props.expandedStory === story) {
			classArr.push('expanded-image')
		}

		const classOutput = classArr.join(' ')

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
			{csImgData.allCaseStoriesYaml.edges.map((story, index) => (
				<div
					className={imageClassHandler(index)} 
					id={`story-${index}`} 
					key={index}
					onClick={() => { clickHandler(index) }}
					onMouseEnter={() => { mouseEnterHandler(index) }}
					onMouseLeave={() => {mouseLeaveHandler(index) }}
					role="presentation"
				>
					<Img fluid={story.node.content.bw.childImageSharp.fluid} alt={story.node.content.title} />
				</div>
			))}
			<div class="color-images">
			{csImgData.allCaseStoriesYaml.edges.map((story, index) => (
				<div
					className={colorClassHandler(index)}
					id={`story-${index}`} 
					key={index}
					onClick={() => { clickHandler(index) }}
					role="presentation"
				>
					<Img fluid={story.node.content.color.childImageSharp.fluid} alt={story.node.content.title} />
				</div>
			))}
			</div>
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