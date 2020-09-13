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

		this.storyMeta = []

		this.clickHandler = this.clickHandler.bind(this)
		this.storyClassHandler = this.storyClassHandler.bind(this)
		this.storyCloser = this.storyCloser.bind(this)
		this.storyOpener = this.storyOpener.bind(this)
		this.swapState = this.swapState.bind(this)
	}

	clickHandler(story) {
		this.props.caseStoryCycle(false)
		this.props.setActiveStory(story)
		this.props.setSelectedStory(story)
		this.props.setExpandedStory(story)
	}

	storyCloser() {
		this.props.caseStoryCycle(true)
		this.props.setActiveStory(0)
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

	componentDidMount() {
		this.swapState(this.props.activeStory)
		this.storyClassHandler(this.props.activeStory)
	}

	storyClassHandler(story) {
		let classOutput = null

		if (this.props.expandedStory === story) {
			classOutput = 'story-shift active-story expanded-story'
		} else if (this.props.selectedStory === story && this.props.activeStory === story) {
			classOutput = 'story-shift active-story'
		} else if (this.props.selectedStory === null && this.props.activeStory === story) {
				classOutput = 'story-shift active-story'
		} else {
			classOutput = 'story-shift'
		}

		return classOutput
	}

	swapState(story) {
		let index = story + 1;
		if (this.props.selectedStory === null) {
			setInterval(() => {
				if (this.props.caseStoryCycle && this.props.selectedStory === null) {
					this.props.setActiveStory(index)
					this.storyClassHandler(index)
					// Won't lie. This math has me scratching my head
					if (index <= 1) {
						index += 1;
					} else {
						index = 0
					}
				} else {
					clearInterval()
				}
			}, 10000)
		}
	}

	render() {
		return (
			<section className="casestories" id="case-stories">
				<div className="columns">
					<Images />
					<div className={(this.props.expandedStory !== null ? 'column story expanded' : 'column story')}>
						<div className={(this.props.expandedStory !== null ? 'story-head expanded' : 'story-head')}>
							<h2>What's your story?</h2>
							<p>Every day we make business decisions off the information available to us; Let us show you how to leverage the power of continuous intelligence to your advantage.</p>
						</div>
						<div 
							className={(this.props.expandedStory !== null ? 'story-container expanded' : 'story-container')}
						>
							{this.props.storyData.map((story, index) => (
							<div className={this.storyClassHandler(index)}  
								 key={index}
							>
								<div 
									className="story-meta" 
									ref={storyMeta => this.storyMeta[index] = storyMeta}
								>
									<h3>{story.node.content.title}</h3>
									<p>{story.node.content.excerpt}</p>
									<ul>
										<li><button 
												className="cta"
												onClick={() => {this.storyOpener(index)}}
											>Read More</button></li>
										{(story.node.content.link !== null ? <li><a href={`http://${story.node.content.link}`} target="_blank" rel="noreferrer">Learn more about our Tracing software, safercontact<span>&reg;</span></a></li> : '')}
									</ul>
								</div>
								<div className="story-body">
									<h3>{story.node.content.title}</h3>
									{story.node.content.body.map((body, index) => (
										<p key={index}>{body.paragraph}</p>
									))}
									<button onClick={() => { this.storyCloser() }} className="cta back">Back</button>
								</div>
							</div>
							))}
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