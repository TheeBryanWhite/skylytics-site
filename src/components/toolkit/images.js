import React from "react"
import {
	graphql,
	useStaticQuery
} from 'gatsby'
import Img from "gatsby-image"
import { connect } from "react-redux"

const Images = props => {
	const tkImgData = useStaticQuery(graphql`
		query tkImgQuery {
			allToolkitYaml {
				edges {
					node {
						content {
							src {
								childImageSharp {
									fluid(maxWidth: 600) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	`)

	const classBuilder = index => {
		let classArr = ['tk-img']

		if (props.activeSolution === index) {
			classArr.push('active-image')
		}

		const classes = classArr.join(' ')

		return classes
	}

	return (
		<div className="tk-images">
			{tkImgData.allToolkitYaml.edges.map((user, index) =>
				(
				<div 
					className={classBuilder(index)}
					id={`tk-${index}`}
					key={index}
				>
					<Img fluid={user.node.content.src.childImageSharp.fluid} />
				</div>
				))
			}
		</div>
	)
}

const mapStateToProps = state => ({
	activeSolution: state.app.activeSolution
})

export default connect(mapStateToProps, {})(Images)