import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

const LeadershipImages = props => {
	return (
		<div className="leaders">
			{props.leadershipImageData.map((leader,index) => 
				(
				<div className="leader" key={index}>
					<Link to="/leadership">
						<Img fluid={leader.headshot.localFile.childImageSharp.fluid} />
						<p className="leader-name">{leader.name.text}</p>
						<p className="leader-position">{leader.position.text}</p>
						<p className="read-more">Full Bio</p>
					</Link>
				</div>
				))
			}
		</div>
	)
}

export default LeadershipImages