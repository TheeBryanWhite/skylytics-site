import React, {Component} from 'react'

import './page-body.scss'

class PageBody extends Component {
	constructor(props) {
		super(props)
		this.children = props.children
	}
	
	render() {
		return(
			<section className={`page-body section-anchor page-${this.props.currentPage}`} id={this.props.currentPage}>
				<div className="bgnull"></div>
				{this.children}
			</section>
		)
	}
}

export default PageBody