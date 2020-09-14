import React from 'react'
import { 
	Link, 
	useStaticQuery, 
	graphql
} from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import './elevatorpitch.scss'

const ElevatorPitch = () => {
	const data = useStaticQuery(graphql`
		query EPImgQuery {
			desktop: file(relativePath: { eq: "components/elevator-pitch/img/bridge_section2.jpg" }) {
				childImageSharp {
					fluid(quality: 90, maxWidth: 1920) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`);

  	const epImageData = data.desktop.childImageSharp.fluid

	return (
		<section className="elevator-pitch" id="about-us">
			<BackgroundImage
				className="bgnull"
				fluid={epImageData}
				style={{
					backgroundPosition: 'top right'
				}}
				Tag="div"
			>
			</BackgroundImage>
			<div className="epcopy">
				<div className="container">
					<h2>skylytics<span>&reg;</span> brings clarity to your business by acting as the bridge between continuous intelligence technology and you.</h2>
					<p><Link className="cta" to="#leadership">Meet the Team</Link></p>
				</div>
			</div>
		</section>
	)
}

export default ElevatorPitch