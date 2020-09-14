import React from 'react'
import { 
	Link,
	useStaticQuery, 
	graphql
} from 'gatsby'
import Img from "gatsby-image"

const LeadershipImages = () => {
	const LeadershipData = useStaticQuery(graphql`
		query MyQuery {
			allLeadershipJson(filter: {homepage: {eq: true}}) {
		  		edges {
					node {
			  			name
			  			image {
							childImageSharp {
								fluid(maxWidth: 300) {
									...GatsbyImageSharpFluid
								}
							}
			  			}
			  			position
					}
		  		}
			}
	  	}
	`)

	return (
		<div className="leaders">
			{LeadershipData.allLeadershipJson.edges.map(leader => 
				(
				<div className="leader" key={leader.node.name}>
					<Link to="/leadership">
						<Img fluid={leader.node.image.childImageSharp.fluid} />
						<p className="leader-name">{leader.node.name}</p>
						<p className="leader-position">{leader.node.position}</p>
						<p className="read-more">Full Bio</p>
					</Link>
				</div>
				))
			}
		</div>
	)
}

export default LeadershipImages