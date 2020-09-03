import React from 'react'
import { 
	Link,
	useStaticQuery, 
	graphql
} from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import LeadershipImages from './leadership-images'

import './leadership.scss'

const Leadership = () => {
	const leadershipBgData = useStaticQuery(graphql`
		query LeadershipImgQuery {
			desktop: file(relativePath: { eq: "components/leadership/bg/leadership_background.jpg" }) {
				childImageSharp {
					fluid(quality: 90, maxWidth: 1920) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`);

	const leadershipBgImageData = leadershipBgData.desktop.childImageSharp.fluid
	  
	return (
		<section className="leadership-team" id="leadership">
			<BackgroundImage
				className="bgnull"
				fluid={leadershipBgImageData}
				Tag="div"
			></BackgroundImage>
			<div className="leadership-copy">
				<div className="container">
					<h2>skylytics<span>&reg;</span> Leadership Team</h2>
					<p>Our inspiration to make better business decisions starts with our leaders; the human bridge between continuous intelligence technology and you.</p>
					<LeadershipImages />
					<p><Link className="cta" to="/">Technical Team Members</Link></p>
				</div>
			</div>
		</section>
	)
}

export default Leadership