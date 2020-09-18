import React, {Component} from 'react'
import BackgroundImage from 'gatsby-background-image'

import './subpage-hero.scss'

class SubpageHero extends Component {
	render() {
		return(
			<div className="subpage-hero" id="subpage-hero">
				<BackgroundImage
					className="sub-hero"
					id="leadership-hero"
					fluid={this.props.imgData}
					Tag="section"
				>
					<div className="container">
						<div className="position-this">
							<h2>{this.props.pageTitle}</h2>
							{(this.props.pageSubtitle ? <h3>{this.props.pageSubtitle}</h3> : '')}
						</div>
					</div>
				</BackgroundImage>
			</div>
		)
	}
}

export default SubpageHero