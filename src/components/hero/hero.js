import React from 'react'
import { 
	Link
} from 'gatsby'

import HeroSlides from './hero-slides'

import './hero.scss'

const Hero = props => {
	return (
		<section className="hero" id="home">
				<div className="slides">
					<div className="slidemask">
						<HeroSlides slideData={props.heroBody.hero_slides} />
						<div className="hero-cta">
							<ul>
								<li><Link className="cta" to="#case-stories">Learn More</Link></li>
								{/* <li><Link className="business-profile" to="/">Download skylytics<span>&reg;</span> business profile</Link></li> */}
							</ul>
						</div>
					</div>
				</div>
		</section>
	)
}

export default Hero