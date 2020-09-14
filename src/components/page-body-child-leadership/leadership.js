import React, {Component} from 'react'
import Img from "gatsby-image"

import './leadership.scss'

import LinkedInSvg from './svg/linkedin.svg'
import TwitterSvg from './svg/twitter.svg'

class Leadership extends Component{
	constructor(props) {
		super(props)
		console.log(props)
	}
	render() {
		return(
			<div className="leaders-page container">
				{this.props.bodyData.map((leader, index) => (
					<div className="leader-wrapper" key={index}>
						<div className="leader" key={index}>
							<div className="leader-image flex-item">
								<Img fluid={leader.node.image.childImageSharp.fluid} />
							</div>
							<div className="leader-meta flex-item">
								<p className="leader-name">{leader.node.name}</p>
								<p className="leader-position">{leader.node.position}</p>
								<p className="leader-bio">{leader.node.bio}</p>
								<div className="leader-social">
									<p className="label">Connect | Follow</p>
									<ul>
										{(leader.node.linkedin ? <li className="linkedin"><a href={leader.node.linkedin} target="_blank" rel="noreferrer"><LinkedInSvg /><span className="screen-reader-text">Follow {leader.node.name} on linkedin</span></a></li> : '')}
										{(leader.node.twitter ? <li className="twitter"><a href={leader.node.twitter} target="_blank" rel="noreferrer"><TwitterSvg /><span className="screen-reader-text">Follow {leader.node.name} on twitter</span></a></li> : '')}
									</ul>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}
}

export default Leadership