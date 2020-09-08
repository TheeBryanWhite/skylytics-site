import React from 'react'
import { 
	Link,
	useStaticQuery, 
	graphql
} from 'gatsby'

import HeroSlides from './hero-slides'

import './hero.scss'

const Hero = () => {
	const heroData = useStaticQuery(graphql`
	query heroImgQuery {
		allHeroJson {
			nodes {
				title
				body
				src {
					childImageSharp {
						fluid(maxWidth: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
	`);

	return (
		<section className="hero" id="home">
				<div className="slides">
					<div className="slidemask">
						<HeroSlides slideData={heroData} />
						<div className="hero-cta">
							<ul>
								<li><Link className="cta" to="/">Learn More</Link></li>
								<li><Link className="business-profile" to="/">Download skylytics<span>&reg;</span> business profile</Link></li>
							</ul>
						</div>
					</div>
				</div>
		</section>
	)
}

export default Hero