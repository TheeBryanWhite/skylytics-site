import React from 'react'
import BackgroundImage from 'gatsby-background-image'

import './elevatorpitch.scss'

const ElevatorPitch = props => {
	return (
		<section className="elevator-pitch">
			<button className="anchor-offset" id="about-us">About Us Section</button>
				<BackgroundImage
					className="bgnull"
					fluid={props.aboutUsBody.background_image.localFile.childImageSharp.fluid}
					style={{
						backgroundPosition: 'top right'
					}}
					Tag="div"
				>
				</BackgroundImage>
				<div className="epcopy">
					<div className="container">
						<div dangerouslySetInnerHTML={{ __html: props.aboutUsBody.about_us_body.html }} />
						<p><a className="cta" href={props.aboutUsBody.body[0].primary.link.text}>{props.aboutUsBody.body[0].primary.title.text}</a></p>
					</div>
				</div>
		</section>
	)
}

export default ElevatorPitch