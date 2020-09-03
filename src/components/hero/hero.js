import React from 'react'
import { 
	Link, 
	useStaticQuery, 
	graphql
} from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import './hero.scss'

const Hero = () => {
	const data = useStaticQuery(graphql`
		query HeroImgQuery {
			desktop: file(relativePath: { eq: "components/hero/img/hero-space-bg.jpg" }) {
				childImageSharp {
					fluid(quality: 90, maxWidth: 1920) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`);

  	const heroImageData = data.desktop.childImageSharp.fluid

	return (
		<section className="hero" id="home">
				<div className="slides">
					<BackgroundImage
						className="slide"
						fluid={heroImageData}
						id="slide1"
						Tag="div"
					>
						<div className="container">
							<div className="hero-copy">
								<h2>2.5 Quintillion</h2>
								<p>bytes of data are created every day that must be processed, analyzed, and potentially acted upon.</p>
							</div>
							<div className="hero-cta">
								<ul>
									<li><Link className="cta" to="/">Learn More</Link></li>
									<li><Link className="business-profile" to="/">Download skylytics<span>&reg;</span> business profile</Link></li>
								</ul>
							</div>
						</div>
					</BackgroundImage>
				</div>
		</section>
	)
}

export default Hero