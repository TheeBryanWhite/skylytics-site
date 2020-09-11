import React, { Component } from 'react'
import BackgroundImage from 'gatsby-background-image'
import { connect } from "react-redux";
import { setHeroSlide } from "../../redux/actions/actions";

import './hero.scss'

class HeroSlides extends Component {
	constructor(props) {
		super(props)

		this.slidecontainer = []

		this.swapState = this.swapState.bind(this)
	}

	componentDidMount() {
		this.slidecontainer[0].classList.add('active');
		// this.swapState()
	}

	swapState() {
		let index = 1;

		setInterval(() => {
			if (index <= 2) {
				this.props.setHeroSlide(index)
				this.slidecontainer[index].classList.add('active')
			} else {
				clearInterval()
			}
			index += 1;
		}, 10000)
	}

	render() {
		return (
			this.props.slideData.allHeroJson.nodes.map((hero, index) => (
			<div className="slidecontainer"
				 id={`slide${index}`}
				 key={index}
				 ref={slidecontainer => this.slidecontainer[index] = slidecontainer}
			>
				<BackgroundImage
					className="slide"
					fluid={hero.src.childImageSharp.fluid}
					Tag="div"
				>
				</BackgroundImage>
				<div className="slidecontent container">
					<div className="hero-copy">
						<h2>{hero.title}</h2>
						{
						hero.body.map((body, index) => (
							<p key={index}>{body}</p>
						))
						}
					</div>
				</div>
			</div>
			))
		)
	}
}

const mapStateToProps = state => ({
    heroSlide: state.app.heroSlide
})

export default connect(mapStateToProps, { setHeroSlide })(HeroSlides)