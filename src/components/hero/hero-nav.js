import React from 'react'
import { connect } from "react-redux";
import { setHeroCycle, setHeroSlide } from "../../redux/actions/actions";

const HeroNav = props => {

	const clickHandler = (index) => {
		props.setHeroCycle(false)
		props.setHeroSlide(index)
	}

	return (
		<ul className="hero-nav">
		{
			props.slideData.map((hero, index) => (
				<li>
					<button
						class={(props.heroSlide === index ? 'active-pip' : '')}
						onClick={() => {clickHandler(index)}}
					>
						<span className="screen-reader-text">{index}</span>
					</button>
				</li>
			))
		} 
		</ul>
	)
}

const mapStateToProps = state => ({
	heroCycle: state.app.heroCycle,
	heroSlide: state.app.heroSlide
})

export default connect(mapStateToProps, { setHeroCycle, setHeroSlide })(HeroNav)