import React, { Component } from 'react'
import Images from './images'
import { connect } from "react-redux";
import { setActiveStory } from "../../redux/actions/actions";

import './case-stories.scss'

class CaseStories extends Component {
	constructor(props) {
		super(props)

		this.swapState = this.swapState.bind(this)
	}

	componentDidMount() {
		this.swapState()
	}

	swapState() {
		let index = 1;

		setInterval(() => {
			if (index <= 2) {
				this.props.setActiveStory(index)
			} else {
				this.props.setActiveStory(0)
				index = 0
			}
			index += 1;
		}, 10000)
	}

	render() {
		return (
			<section className="casestories" id="case-stories">
				<div className="columns">
					<Images />
					<div className="column story">
						<div className="story-head">
							<h2>What's your story?</h2>
							<p>Every day we make business decisions off the information available to us; Let us show you how to leverage the power of continuous intelligence to your advantage.</p>
						</div>
						<div className="story-container">
							{this.props.storyData.map((story, index) => (
							<div className={`story-content ${(this.props.activeStory === index ? 'active-story' : '')}`} 
								 id={`story${index}`} 
								 key={index}
							>
								<h3>{story.node.content.title}</h3>
								<p>{story.node.content.excerpt}</p>
								<ul>
									<li><button className="cta" href="#">Read More</button></li>
									{(story.node.content.link !== null ? <li><a href={`http://${story.node.content.link}`} target="_blank" rel="noreferrer">Learn more about our Tracing software, safercontact<span>&reg;</span></a></li> : '')}
								</ul>
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
    activeStory: state.app.activeStory
})

export default connect(mapStateToProps, { setActiveStory })(CaseStories)