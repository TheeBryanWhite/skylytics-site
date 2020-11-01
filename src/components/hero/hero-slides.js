import React, { Component } from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { connect } from "react-redux";
import { setHeroSlide } from "../../redux/actions/actions";

import './hero.scss'

class HeroSlides extends Component {
	constructor(props) {
		super(props)
		this.swapState = this.swapState.bind(this)
	}

	componentDidMount() {
		// const slides = document.querySelectorAll('.slidecontainer')
		
		this.swapState()
		// slides[0].classList.add('active')
	}

	swapState() {
		let index = 1
		const slides = document.querySelectorAll('.slidecontainer')

		setInterval(() => {
			if (index <= 2 && this.props.heroCycle) {
				this.props.setHeroSlide(index)
				// slides[index].classList.add('active')
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
    heroSlide: state.app.heroSlide
})

export default connect(mapStateToProps, { setHeroSlide })(HeroSlides)