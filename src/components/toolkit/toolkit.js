import React, { Component } from "react"
import { connect } from "react-redux";
import LazyLoad from 'react-lazyload'
import { setActiveSolution, setActiveSubtab } from "../../redux/actions/actions";
import Images from './images.js'

import './toolkit.scss'

import AzureSvg from './svg/azure_logo_wht.svg'
import LosantSvg from './svg/losant_logo_wht.svg'
import MicrosoftSvg from './svg/microsoft_partner_white.svg'

class Toolkit extends Component {
	constructor(props) {
		super(props)
		this.solutionClickHandler = this.solutionClickHandler.bind(this)
		this.subtabClickHandler = this.subtabClickHandler.bind(this)
	}

	solutionClickHandler(index) {
		this.props.setActiveSolution(index)
	}

	subtabClickHandler(index) {
		this.props.setActiveSubtab(index)
	}

	render() {
		return (
			<section className="solutions-section" id="solutions">
				<LazyLoad height={200}>
					<div className="bgcontainer">
						<div className="columns">
							<div className="column toolkit-content">
								<div dangerouslySetInnerHTML={{ __html: this.props.solutionsMeta.header.html }} />
		
								<div className="toolkit-options">
									<ul className="tabs">
										{this.props.solutionsBody.map((solution, index) => (
										<li id={`solution-tab-${index}`} key={index}>
											<button
												className={(this.props.activeSolution === index ? 'tab active-tab' : 'tab')}
												onClick={() => { this.solutionClickHandler(index) }}
											>
												<span>{solution.node.primary.button_label.text}</span>
											</button>
										</li>
										))}
									</ul>
		
									<div className="solutions-container">
										{this.props.solutionsBody.map((solution, index) => (
										<ul 
											className={(this.props.activeSolution === index ? 'solution active-solution' : 'solution')}
											id={`solution-${index}`} 
											key={index}
										>
											<li>
												<ul className="subtabs">
													{solution.node.items.map((node, index) => (
														<li 
															className={(this.props.activeSubtab === index ? 'subtab active-subtab' : 'subtab')}
															id={`solution-subtab-${index}`} 
															key={index}
														>
																<button onClick={() => { this.subtabClickHandler(index) }}>
																	{node.subtab_label.text}
																</button>
														</li>
													))}
												</ul>
											</li>
											<li>
												<ul className="descriptors">
													{solution.node.items.map((node, index) => (
													<li 
														className={(this.props.activeSubtab === index ? 'descriptor active-descriptor' : 'descriptor')}
														key={index}
														dangerouslySetInnerHTML={{ __html: node.subtab_body.html }}
													/>
													))}
												</ul>
											</li>
										</ul>
										))}
									</div>
								</div>
		
								<div className="tool-logos">
									<ul>
										<li><MicrosoftSvg /><span className="screen-reader-text">Microsoft Gold Certified</span></li>
										<li><AzureSvg /><span className="screen-reader-text">Azure</span></li>
										<li><LosantSvg /><span className="screen-reader-text">Losant</span></li>
									</ul>
								</div>
							</div>
							<div className="column toolkit-images">
								<Images tkImageData={this.props.solutionsBody} />
							</div>
						</div>
					</div>
				</LazyLoad>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	activeSolution: state.app.activeSolution,
	activeSubtab: state.app.activeSubtab
})

export default connect(mapStateToProps, { setActiveSolution, setActiveSubtab })(Toolkit)