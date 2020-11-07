import React from 'react'
import Img from "gatsby-image"
import { connect } from "react-redux"
import { 
	setCaseStoryCycle,
	setSelectedStory,
	setExpandedStory,
	setMobileCaseState,
	setActiveStory
} from "../../redux/actions/actions"
import intervalHandler from '../../utils/intervalHandler'

import './case-stories.scss'

const Images = props => {
	const csImgData = props.storyImages

	let index = 0

	const autoSlide = () => {
			props.setActiveStory(index)

			if (index < 2) {
				index += 1
				props.setActiveStory(index)
				props.setSelectedStory(index)
			} else {
				index = 0
				props.setActiveStory(0)
				props.setSelectedStory(0)
			}	
	}

	const stopAutoSlide = intervalHandler(autoSlide, 6000)

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
		stopAutoSlide()
		props.setCaseStoryCycle(false)
		props.setSelectedStory(story)
		props.setActiveStory(story)
		props.setExpandedStory(null)
	}

	const mouseEnterHandler = story => {
		stopAutoSlide()
		props.setCaseStoryCycle(false)
		props.setActiveStory(story)
		props.setSelectedStory(story)
	}
	
	return(
		<div className="column story-options">
			<div className="images-thumbs">
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
			</div>
			
			<div className="images-color">
				<div className="bgcast"></div>
			{csImgData.map((story, index) => (
				<div
					className={colorClassHandler(index)}
					id={`story-${index}`} 
					key={index}
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
		setCaseStoryCycle
	})(Images)