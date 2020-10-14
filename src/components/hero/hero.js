import React from 'react'

import HeroSlides from './hero-slides'

import './hero.scss'

const Hero = props => {
	return (
		<section className="hero section-anchor" id="home">
			<div className="bgcolor">
				<div className="slides">
					<div className="slidemask">
						<HeroSlides slideData={props.heroBody.hero_slides} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero