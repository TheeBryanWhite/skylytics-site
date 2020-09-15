import React from "react"
import Img from "gatsby-image"
import { connect } from "react-redux"

const Images = props => {
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
			{props.tkImageData.map((user, index) =>
				(
				<div 
					className={classBuilder(index)}
					id={`tk-${index}`}
					key={index}
				>
					<Img 
						alt={user.node.primary.image.alt}
						fluid={user.node.primary.image.localFile.childImageSharp.fluid}
					/>
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