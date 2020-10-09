import React, { Component } from "react"
import { connect } from "react-redux";
import { 
	setActiveSolution, 
	setActiveSubtab,
	setListOpenClose
} from "../../redux/actions/actions";
import Images from './images'
import SelectList from './SelectList'

import './toolkit.scss'

import AzureSvg from './svg/azure_logo_wht.svg'
import LosantSvg from './svg/losant_logo_wht.svg'
import MicrosoftSvg from './svg/microsoft_partner_white.svg'

class Toolkit extends Component {
	constructor(props) {
		super(props)
		this.solutionClickHandler = this.solutionClickHandler.bind(this)
	}

	solutionClickHandler(index) {
		this.props.setActiveSolution(index)
		this.props.setListOpenClose('false')
	}

	render() {
		return (
			<section className="solutions-section">
				<button className="anchor-offset section-anchor" id="solutions">Toolkit Section</button>
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
												<SelectList listProps={solution} />
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
				
			</section>
		)
	}
}

const mapStateToProps = state => ({
	activeSolution: state.app.activeSolution,
	activeSubtab: state.app.activeSubtab,
	solutionsSubList: state.app.solutionsSubList
})

export default connect(mapStateToProps, { setActiveSolution, setActiveSubtab, setListOpenClose })(Toolkit)