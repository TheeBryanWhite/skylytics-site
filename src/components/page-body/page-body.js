import React, {Component} from 'react'
import { connect } from 'react-redux'
import Img from "gatsby-image"

import LinkedInSvg from './svg/linkedin.svg'
import TwitterSvg from './svg/twitter.svg'

import './page-body.scss'

class PageBody extends Component {
	render() {
		return(
			<section id={`page-${this.props.currentPage}`} className={`page-body page-${this.props.currentPage}`}>
				<div className="bgnull"></div>
				<div className="leaders container">
					{this.props.bodyData.map((leader, index) => (
						<div className="leader-wrapper">
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
			</section>
		)
	}
}
  
const mapStateToProps = state => ({
	currentPage: state.app.currentPage,
})

export default connect(mapStateToProps, null)(PageBody)