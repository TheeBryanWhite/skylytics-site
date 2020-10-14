import React, { useCallback, useEffect, useRef } from 'react'
import Images from './images'
import { connect } from "react-redux";
import { 
	setCaseStoryCycle,
	setActiveStory,
	setExpandedStory,
	setMobileCaseState,
	setSelectedStory
} from "../../redux/actions/actions";
import intervalHandler from '../../utils/intervalHandler'

import './case-stories.scss'

const CaseStories = props => {
	let index = useRef(0)

	const autoSlide = useCallback(() => {
		props.setActiveStory(index.current)

		if (props.caseStoryCycle) {
			if (index.current < 2) {
				index.current += 1
				props.setActiveStory(index.current)
				props.setSelectedStory(index.current)
			} else {
				index.current = 0
				props.setActiveStory(0)
				props.setSelectedStory(0)
			}
		}
	}, [props])

	const getLargestBody = () => {
		let bodyHeights = []

		const storyBodies = document.getElementsByClassName('story-meta')
		const storyMetaContainer = document.getElementById('story-metas')
		const bodiesArr = [].slice.call(storyBodies)

		bodiesArr.forEach(body => {
			bodyHeights.push(body.offsetHeight)
		})

		const largest =  Math.max(...bodyHeights)
		
		storyMetaContainer.style.height = largest + 'px'
	}

	const storyCloser = () => {
		props.setSelectedStory(null)
		props.setExpandedStory(null)
		props.setMobileCaseState(this.props.mobileCaseState)
	}

	const storyOpener = story => {
		stopAutoSlide()
		props.setCaseStoryCycle(false)
		props.setActiveStory(story)
		props.setSelectedStory(story)
		props.setExpandedStory(story)
		props.setMobileCaseState(this.props.mobileCaseState)
	}

	const storyMetaClassHandler = story => {
		let classOutput = null

		if (props.expandedStory === story) {
			classOutput = 'story-meta active-story expanded-story'
		} else if (props.selectedStory === story && props.activeStory === story) {
			classOutput = 'story-meta active-story'
		} else if (props.selectedStory === null && props.activeStory === story) {
				classOutput = 'story-meta active-story'
		} else {
			classOutput = 'story-meta'
		}

		return classOutput
	}

	const storyBodyClassHandler = story => {
		let classOutput = null

		if (props.expandedStory === story) {
			classOutput = 'story-body active-story expanded-story'
		} else if (props.selectedStory === story && props.activeStory === story) {
			classOutput = 'story-body active-story'
		} else if (props.selectedStory === null && props.activeStory === story) {
				classOutput = 'story-body active-story'
		} else {
			classOutput = 'story-body'
		}

		return classOutput
	}

	const stopAutoSlide = intervalHandler(autoSlide, 6000)

	// useEffect(() => {
	// 	getLargestBody()
	// }, [autoSlide])
	
	return (
		<section 
			className={(props.expandedStory !== null ? 'casestories section-anchor expanded' : 'casestories section-anchor')}
			id="case-stories"
		>				
			<div className="bgmask">
				<div className="columns">
					<Images storyImages={props.storyBody} />
					<div className="column story">
						<div className="center-this column-restrict">
							<div 
								className="story-head"
								dangerouslySetInnerHTML={{ __html: props.storyMeta.header.html }}
							/>

							<div 
								className="story-meta-container"
								id="story-metas"
							>
							{props.storyBody.map((story, index) => (
								<div 
									className={storyMetaClassHandler(index)} 
									ref={storyMeta => storyMeta[index] = storyMeta}
								>
								<div dangerouslySetInnerHTML={{ __html: story.node.items[0].excerpt.html }} />
								<ul>
									<li><button 
											className="cta"
											onClick={() => {storyOpener(index)}}
										>Read More</button></li>
									{(index === 0 ? <li><a href="http://www.safercontact.com" target="_blank" rel="noreferrer">Learn more about our Contact Tracing software, safercontact<span>&reg;</span></a></li> : '')}
								</ul>
							</div>
							))}
							</div>
						</div>
						<div className="story-body-container">
							{props.storyBody.map((story, index) => (
								<div className={storyBodyClassHandler(index)} >
									<div dangerouslySetInnerHTML={{ __html: story.node.items[0].story_body.html }} />
									<button onClick={() => { storyCloser() }} className="cta back">Back</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const mapStateToProps = state => ({
	activeStory: state.app.activeStory,
	caseStoryCycle: state.app.caseStoryCycle,
	expandedStory: state.app.expandedStory,
	mobileCaseState: state.app.mobileCaseState,
	selectedStory: state.app.selectedStory
})

export default connect(
					mapStateToProps,
					{ 
						setCaseStoryCycle,
						setActiveStory, 
						setExpandedStory, 
						setMobileCaseState,
						setSelectedStory 
					})
					(CaseStories)