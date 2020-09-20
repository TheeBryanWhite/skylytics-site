import React from 'react'
import { Link } from 'gatsby'
import LazyLoad from 'react-lazyload'
import BackgroundImage from 'gatsby-background-image'
import LeadershipImages from './images'

import './leadership.scss'

const Leadership = props => {
	return (
		<section className="leadership-team" id="leadership">
				<BackgroundImage
					className="bgnull"
					fluid={props.leadershipMeta.background_image.localFile.childImageSharp.fluid}
					Tag="div"
				></BackgroundImage>
				<div className="leadership-copy">
					<div className="container">
					<div dangerouslySetInnerHTML={{ __html: props.leadershipMeta.leadership_section_header.html }} />
						<LeadershipImages leadershipImageData={props.leadershipBody} />
						<p><Link
							className="cta"
							to="/leadership">Leadership Team Members</Link></p>
					</div>
				</div>
		</section>
	)
}
  
export default Leadership