import React, {Component} from 'react'
import Img from "gatsby-image"

import './leadership.scss'

import LinkedInSvg from './svg/linkedin.svg'
import TwitterSvg from './svg/twitter.svg'

class Leadership extends Component{
	render() {
		return(
			<div className="leaders-page container">
				<div className="leaders executives">
					<h2>Executives</h2>
					<div className="leader-wrapper">
				{this.props.bodyData.items.map((leader, index) => {
					if (leader.feature_on_homepage) {
						return(
								<div 
									className="leader"
									key={index}
								>
									<button className="anchor-offset" id={index}>{leader.name.text}</button>
									<div className="leader-image flex-item">
										<Img fluid={leader.headshot.localFile.childImageSharp.fluid} />
									</div>
									<div className="leader-meta flex-item">
										<p className="leader-name">{leader.name.text}</p>
										<p className="leader-position">{leader.position.text}</p>
										<div className="leader-bio" dangerouslySetInnerHTML={{ __html: leader.bio.html }} />
										<div className="leader-social">
											<p className="label">Connect | Follow</p>
											<ul>
												{(leader.linkedin ? <li className="linkedin"><a href={leader.linkedin.url} target={leader.linkedin.target} rel="noreferrer"><LinkedInSvg /><span className="screen-reader-text">Follow {leader.name.text} on linkedin</span></a></li> : '')}
												{(leader.twitter ? <li className="twitter"><a href={leader.twitter.url} target={leader.twitter.target} rel="noreferrer"><TwitterSvg /><span className="screen-reader-text">Follow {leader.name.text} on twitter</span></a></li> : '')}
											</ul>
										</div>
									</div>
								</div>
							)
						}
						return false
					})}
				</div>
				</div>

				<div className="leaders leadership">
					<h2>Leadership</h2>
					<div className="leader-wrapper">
				{this.props.bodyData.items.map((leader, index) => {
					if (!leader.feature_on_homepage) {
						return(
								<div 
									className="leader"
									key={index}
								>
									<button className="anchor-offset" id={index}>{leader.name.text}</button>
									<div className="leader-image flex-item">
										<Img fluid={leader.headshot.localFile.childImageSharp.fluid} />
									</div>
									<div className="leader-meta flex-item">
										<p className="leader-name">{leader.name.text}</p>
										<p className="leader-position">{leader.position.text}</p>
										<div className="leader-bio" dangerouslySetInnerHTML={{ __html: leader.bio.html }} />
										<div className="leader-social">
											<p className="label">Connect | Follow</p>
											<ul>
												{(leader.linkedin ? <li className="linkedin"><a href={leader.linkedin.url} target={leader.linkedin.target} rel="noreferrer"><LinkedInSvg /><span className="screen-reader-text">Follow {leader.name.text} on linkedin</span></a></li> : '')}
											</ul>
										</div>
									</div>
								</div>
							)
						}
						return false
					})}
				</div>
				</div>
			</div>
		)
	}
}

export default Leadership