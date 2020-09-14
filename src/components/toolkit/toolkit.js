import React, { Component } from "react"
import { connect } from "react-redux";
import { setActiveSolution, setActiveSubtab } from "../../redux/actions/actions";
import Images from './images.js'

import './toolkit.scss'

import AzureSvg from './svg/azure_logo_wht.svg'
import LosantSvg from './svg/losant_logo_wht.svg'
import MicrosoftSvg from './svg/microsoft_logo_wht.svg'
import TableauSvg from './svg/tableau_logo_wht.svg'

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
				<div className="bgcontainer">
					<div className="columns">
						<div className="column toolkit-content">
							<h2>We provide business clarity through continuous intelligence solutions</h2>
							<p>Let’s build a toolkit for a successful business.</p>
	
							<div className="toolkit-options">
								<ul className="tabs">
									{this.props.solutionsData.map((solution, index) => (
									<li id={`solution-tab-${index}`} key={index}>
										<button onClick={() => { this.solutionClickHandler(index) }}>
											<span>{solution.node.content.title}</span>
										</button>
									</li>
									))}
								</ul>
	
								<div className="solutions-container">
									{this.props.solutionsData.map((solution, index) => (
									<ul 
										className={(this.props.activeSolution === index ? 'solution active-solution' : 'solution')}
										id={`solution-${index}`} 
										key={index}
									>
										<li>
											<ul className="subtabs">
												{solution.node.content.options.map((node, index) => (
													<li 
														className={(this.props.activeSubtab === index ? 'subtab active-subtab' : 'subtab')}
														id={`solution-subtab-${index}`} 
														key={index}
													>
															<button onClick={() => { this.subtabClickHandler(index) }}>
																{node.option.name}
															</button>
													</li>
												))}
											</ul>
										</li>
										<li>
											<ul className="descriptors">
												{solution.node.content.options.map((node, index) => (
												<li 
													className={(this.props.activeSubtab === index ? 'descriptor active-descriptor' : 'descriptor')}
													key={index}
												>
													{node.option.body}
												</li>
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
									<li><TableauSvg /><span className="screen-reader-text">Tableau</span></li>
								</ul>
							</div>
						</div>
						<div className="column toolkit-images">
							<Images />
						</div>
					</div>
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	activeSolution: state.app.activeSolution,
	activeSubtab: state.app.activeSubtab
})

export default connect(mapStateToProps, { setActiveSolution, setActiveSubtab })(Toolkit)