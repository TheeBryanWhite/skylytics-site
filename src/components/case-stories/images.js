import React from 'react'
import Img from "gatsby-image"
import { connect } from "react-redux"
import { 
	caseStoryCycle,
	setSelectedStory,
	setExpandedStory,
	setMobileCaseState,
	setActiveStory
} from "../../redux/actions/actions"

import './case-stories.scss'

const Images = props => {
	const csImgData = props.storyImages

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

	const storyCloser = (story) => {
		props.setActiveStory(story)
		props.setSelectedStory(story)
		props.setExpandedStory(null)
		props.setMobileCaseState(props.caseState)
	}

	const mouseEnterHandler = story => {
		if (props.selectedStory === null) {
			props.setActiveStory(story)
		}
	}
	
	// const mouseLeaveHandler = story => {
	// 	if (props.selectedStory === null) {
	// 		props.setActiveStory(story)
	// 	}
	// }
	
	return(
		<div className="column story-options">
			{csImgData.map((story, index) => (
			<div
				className={imageClassHandler(index)} 
				id={`story-${index}`} 
				key={index}
				onClick={() => { clickHandler(index) }}
				onMouseEnter={() => { mouseEnterHandler(index) }}
				role="presentation"
			>
				<Img fluid={story.node.items[0].bw_image.localFile.childImageSharp.fluid} alt={story.node.items[0].bw_image.alt} />
			</div>
			))}
			<div className="color-images">
			{csImgData.map((story, index) => (
				<div
					className={colorClassHandler(index)}
					id={`story-${index}`} 
					key={index}
					onClick={() => { storyCloser(index) }}
					role="presentation"
				>
					<Img fluid={story.node.items[0].color_image.localFile.childImageSharp.fluid} alt={story.node.items[0].bw_image.alt} />
				</div>
			))}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	activeStory: state.app.activeStory,
	caseState: state.app.mobileCaseState,
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
		setMobileCaseState,
		caseStoryCycle
	})(Images)