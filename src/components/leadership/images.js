import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

const LeadershipImages = props => {

	return (
		<div className="leaders">
			{props.leadershipImageData.map((leader,index) => 
				{
					if (leader.feature_on_homepage) {
						return(
							<div className="leader" key={index}>
								<Link to={`/leadership#${index}`}>
									<Img fluid={leader.headshot.localFile.childImageSharp.fluid} />
									<p className="leader-name">{leader.name.text}</p>
									<p className="leader-position">{leader.position.text}</p>
									<p className="read-more">Full Bio</p>
								</Link>
							</div>
						)
					}
					return false
				})
			}
		</div>
	)
}

export default LeadershipImages