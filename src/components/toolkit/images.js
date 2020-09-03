import React from "react"
import {
	graphql,
	useStaticQuery
} from 'gatsby'
import Img from "gatsby-image"

const Images = () => {
	const tkImgData = useStaticQuery(graphql`
		query tkImgQuery {
			allFile(filter: {extension: {regex: "/(jpg)/"}, relativeDirectory: {eq: "components/toolkit/img"}}) {
				edges {
					node {
						base
						childImageSharp {
							fluid {
								aspectRatio
								base64
								src
								srcSet
								sizes
							}
						}
					}
				}
			}
		}
	`)

	return (
		<div className="tk-images">
			{tkImgData.allFile.edges.map(({node}, index) => 
				(
				<div className="tk-img" id={`tk-${index}`} key={index}>
					<Img fluid={node.childImageSharp.fluid} />
				</div>
				))
			}
		</div>
	)
}

export default Images