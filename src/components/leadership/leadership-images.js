import React from 'react'
import { 
	Link,
	useStaticQuery, 
	graphql
} from 'gatsby'
import Img from "gatsby-image"

const LeadershipImages = () => {
	const LeadershipData = useStaticQuery(graphql`
		query leadershipImgQuery {
			allLeadershipJson {
				nodes {
					name
					position
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
	`)

	return (
		<div className="leaders">
			{LeadershipData.allLeadershipJson.nodes.map(leader => 
				(
				<div className="leader" key={leader.name}>
					<Img fluid={leader.src.childImageSharp.fluid} />
					<p className="leader-name">{leader.name}</p>
					<p className="leader-position">{leader.position}</p>
					<p className="read-more"><Link to="/">Full Bio</Link></p>
				</div>
				))
			}
		</div>
	)
}

export default LeadershipImages