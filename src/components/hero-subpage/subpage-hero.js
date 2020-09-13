import React, {Component} from 'react'
import BackgroundImage from 'gatsby-background-image'

import './subpage-hero.scss'

class SubpageHero extends Component {
	constructor(props) {
		super(props)
		console.log(props)
	}

	render() {
		return(
			<div className="subpage-hero" id="subpage-hero">
				<BackgroundImage
					className="hero"
					id="leadership-hero"
					fluid={this.props.imgData}
					Tag="div"
				>
					<h2>{this.props.pageTitle}</h2>
				</BackgroundImage>
			</div>
		)
	}
}

export default SubpageHero