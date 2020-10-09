import React, { Component } from 'react'
import Images from './images'
import { connect } from "react-redux";
import { 
	caseStoryCycle,
	setActiveStory,
	setExpandedStory,
	setMobileCaseState,
	setSelectedStory
} from "../../redux/actions/actions";

import './case-stories.scss'

class CaseStories extends Component {
	constructor(props) {
		super(props)

		this.clickHandler = this.clickHandler.bind(this)
		this.getLargestBody = this.getLargestBody.bind(this)
		this.storyBodyClassHandler = this.storyBodyClassHandler.bind(this)
		this.storyCloser = this.storyCloser.bind(this)
		this.storyMetaClassHandler = this.storyMetaClassHandler.bind(this)
		this.storyOpener = this.storyOpener.bind(this)
	}

	clickHandler(story) {
		this.props.caseStoryCycle(false)
		this.props.setActiveStory(story)
		this.props.setSelectedStory(story)
		this.props.setExpandedStory(story)
	}

	componentDidMount() {
		this.getLargestBody()
	}

	getLargestBody() {
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

	storyCloser() {
		this.props.caseStoryCycle(true)
		this.props.setSelectedStory(null)
		this.props.setExpandedStory(null)
		this.props.setMobileCaseState(this.props.mobileCaseState)
	}

	storyOpener(story) {
		this.props.caseStoryCycle(false)
		this.props.setActiveStory(story)
		this.props.setSelectedStory(story)
		this.props.setExpandedStory(story)
		this.props.setMobileCaseState(this.props.mobileCaseState)
	}

	storyMetaClassHandler(story) {
		let classOutput = null

		if (this.props.expandedStory === story) {
			classOutput = 'story-meta active-story expanded-story'
		} else if (this.props.selectedStory === story && this.props.activeStory === story) {
			classOutput = 'story-meta active-story'
		} else if (this.props.selectedStory === null && this.props.activeStory === story) {
				classOutput = 'story-meta active-story'
		} else {
			classOutput = 'story-meta'
		}

		return classOutput
	}

	storyBodyClassHandler(story) {
		let classOutput = null

		if (this.props.expandedStory === story) {
			classOutput = 'story-body active-story expanded-story'
		} else if (this.props.selectedStory === story && this.props.activeStory === story) {
			classOutput = 'story-body active-story'
		} else if (this.props.selectedStory === null && this.props.activeStory === story) {
				classOutput = 'story-body active-story'
		} else {
			classOutput = 'story-body'
		}

		return classOutput
	}

	render() {
		return (
			<section 
				className={(this.props.expandedStory !== null ? 'casestories section-anchor expanded' : 'casestories section-anchor')}
				id="case-stories"
			>				
				<div className="bgmask">
					<div className="columns">
						<Images storyImages={this.props.storyBody} />
						<div className="column story">
							<div className="center-this">
								<div 
									className="story-head"
									dangerouslySetInnerHTML={{ __html: this.props.storyMeta.header.html }}
								/>

								<div 
									className="story-meta-container"
									id="story-metas"
								>
								{this.props.storyBody.map((story, index) => (
									<div 
										className={this.storyMetaClassHandler(index)} 
										ref={storyMeta => this.storyMeta[index] = storyMeta}
									>
									<div dangerouslySetInnerHTML={{ __html: story.node.items[0].excerpt.html }} />
									<ul>
										<li><button 
												className="cta"
												onClick={() => {this.storyOpener(index)}}
											>Read More</button></li>
										{(index === 0 ? <li><a href="http://www.safercontact.com" target="_blank" rel="noreferrer">Learn more about our Contact Tracing software, safercontact<span>&reg;</span></a></li> : '')}
									</ul>
								</div>
								))}
								</div>
							</div>
							<div className="story-body-container">
								{this.props.storyBody.map((story, index) => (
									<div className={this.storyBodyClassHandler(index)} >
										<div dangerouslySetInnerHTML={{ __html: story.node.items[0].story_body.html }} />
										<button onClick={() => { this.storyCloser() }} className="cta back">Back</button>
									</div>
								))}
								</div>
								{/* <div
									className={(this.props.expandedStory !== null ? 'story-foot expanded' : 'story-foot')}
									dangerouslySetInnerHTML={{ __html: this.props.storyMeta.footer.html }}
								/> */}
						</div>
					</div>
				</div>
			</section>
		)
	}
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
						caseStoryCycle,
						setActiveStory, 
						setExpandedStory, 
						setMobileCaseState,
						setSelectedStory 
					})
					(CaseStories)