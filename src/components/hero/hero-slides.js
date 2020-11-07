import React, { Component } from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { connect } from "react-redux";
import { 
	setHeroSlide,
	setCaseStoryCycle,
	setActiveStory,
	setExpandedStory,
	setMobileCaseState,
	setSelectedStory
 } from "../../redux/actions/actions";

import './hero.scss'

class HeroSlides extends Component {
	constructor(props) {
		super(props)
		this.findLinks = this.findLinks.bind(this)
		this.swapState = this.swapState.bind(this)
	}

	componentDidMount() {
		this.swapState()
		// this.findLinks()
	}

	findLinks() {
		const slideMask = document.getElementsByClassName('slidemask')
		const slideContent = slideMask[0].querySelectorAll('.hero-copy')
		slideContent.forEach(slide => {
			const links = slide.querySelectorAll('a')
			if (links.length > 0) {
				links.forEach(link => {
					link.addEventListener('click', () => {
						const destination = link.hash
						const destArr = destination.split('?')
						const theSlide = destArr[1].replace('slide=', '')
						this.props.setCaseStoryCycle(false)
						this.props.setActiveStory(theSlide)
						this.props.setSelectedStory(theSlide)
						this.props.setExpandedStory(theSlide)
						
					})
				})
			}
		})
	}

	swapState() {
		let index = 1

		setInterval(() => {
			if (index <= 2 && this.props.heroCycle) {
				this.props.setHeroSlide(index)
			} else {
				clearInterval()
			}
			
			index += 1
		}, 9000)
	}

	render() {
		return (
			this.props.slideData.map((hero, index) => (
			<div className={(this.props.heroSlide === index ? 'active slidecontainer' : 'slidecontainer')} 
				 id={`slide${index}`}
				 key={index}
			>
				<div className="overlay"></div>
				<BackgroundImage
					className="slide"
					fadeIn={false}
					fluid={hero.hero_background_image.localFile.childImageSharp.fluid}
					preserveStackingContext={true}
					Tag="div"
				>
				</BackgroundImage>
				<div className="slidecontent container">
					<div className="hero-copy" dangerouslySetInnerHTML={{ __html: hero.hero_body.html }} />
					<div className="hero-cta">
						<ul>
							<li><Link className="cta" to="#case-stories">Learn More</Link></li>
							{/* <li><Link className="business-profile" to="/">Download skylytics<span>&reg;</span> business profile</Link></li> */}
						</ul>
					</div>
				</div>
			</div>
			))
		)
	}
}

const mapStateToProps = state => ({
	heroCycle: state.app.heroCycle,
	heroSlide: state.app.heroSlide,
	mobileCaseState: state.app.mobileCaseState
})

export default connect(mapStateToProps, { 
											setHeroSlide,
											setCaseStoryCycle,
											setActiveStory,
											setExpandedStory,
											setMobileCaseState,
											setSelectedStory
										})(HeroSlides)