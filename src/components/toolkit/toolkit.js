import React, { Component } from "react"
import Images from './images.js'

import './toolkit.scss'

import AzureSvg from './svg/azure_logo_wht.svg'
import LosantSvg from './svg/losant_logo_wht.svg'
import MicrosoftSvg from './svg/microsoft_logo_wht.svg'
import SkylyticsSvg from './svg/skylytics-logo.svg'
import TableauSvg from './svg/tableau_logo_wht.svg'

class Toolkit extends Component {
	constructor(props) {
		super(props);

		this.tabs = React.createRef();
		this.solution = React.createRef();
	}

	componentDidMount() {
		this.solution.current.style.height = this.tabs.current.offsetHeight
	}

	render() {
		return (
			<section className="toolkit" id="toolkit">
				<div className="bgcontainer">
					<div className="columns">
						<div className="column toolkit-content">
							<h2>We provide business clarity through continuous intelligence solutions</h2>
							<p>Let’s build a toolkit for a successful business.</p>
	
							<div className="toolkit-options">
								<div className="tab-indicator">
									<SkylyticsSvg />
								</div>
								<ul className="tabs" ref={this.tabs}>
									<li><a href="/"><span>Professional &amp; Managed Services</span></a></li>
									<li><a href="/"><span>Development Operations</span></a></li>
									<li><a href="/"><span>Solutions Strategy &amp; Development</span></a></li>
								</ul>
	
								<ul className="solution" ref={this.solution}>
									<li>
										<ul className="subtabs">
											<li><a href="#analytics">Analytics</a></li>
											<li><a href="#data-science">Full-Stack Data Science</a></li>
											<li><a href="#data-engineering">Data Engineering</a></li>
											<li><a href="#solution-development">Solutions Development</a></li>
										</ul>
									</li>
									<li>
										<ul className="descriptors">
											<li className="analytics">Well developed descriptive, prescriptive, and predictive analytics can be a game changer for organizations of any size as they seek to become better producers and consumers of insight derived from internal and external data.  We work side by side with clients to develop analytics that align with their business strategies to identify opportunities for top line revenue growth and expense optimizations.</li>
										</ul>
									</li>
								</ul>
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

export default Toolkit