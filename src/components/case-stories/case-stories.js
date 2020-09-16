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
			<section 
			className={(this.props.expandedStory !== null ? 'casestories expanded' : 'casestories')}
				id="case-stories"
			>
				<div className="columns">
					<Images storyImages={this.props.storyBody} />
					<div className={(this.props.expandedStory !== null ? 'column story expanded' : 'column story')}>
						<div 
							className={(this.props.expandedStory !== null ? 'story-head expanded' : 'story-head')}
							dangerouslySetInnerHTML={{ __html: this.props.storyMeta.header.html }}
						/>
						<div 
							className={(this.props.expandedStory !== null ? 'story-container expanded' : 'story-container')}
						>
							{this.props.storyBody.map((story, index) => (
							<div className={this.storyClassHandler(index)}  
								 key={index}
							>
								<div 
									className="story-meta" 
									ref={storyMeta => this.storyMeta[index] = storyMeta}
								>
									<div dangerouslySetInnerHTML={{ __html: story.node.items[0].excerpt.html }} />
									<ul>
										<li><button 
												className="cta"
												onClick={() => {this.storyOpener(index)}}
											>Read More</button></li>
										{(index === 0 ? <li><a href="http://safercontact.com" target="_blank" rel="noreferrer">Learn more about our Tracing software, safercontact<span>&reg;</span></a></li> : '')}
									</ul>
								</div>
								<div className="story-body">
								<div dangerouslySetInnerHTML={{ __html: story.node.items[0].story_body.html }} />
									<button onClick={() => { this.storyCloser() }} className="cta back">Back</button>
								</div>
							</div>
							))}
						</div>
						<div
							className={(this.props.expandedStory !== null ? 'story-foot expanded' : 'story-foot')}
							dangerouslySetInnerHTML={{ __html: this.props.storyMeta.footer.html }}
						/>
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