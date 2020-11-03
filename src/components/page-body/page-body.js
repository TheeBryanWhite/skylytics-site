import React, {Component} from 'react'

import './page-body.scss'

class PageBody extends Component {
	constructor(props) {
		super(props)
		this.children = props.children
		this.currentPage = props.currentPage
	}
	
	render() {
		return(
			<section id={`page-${this.currentPage}`} className={`page-body page-${this.currentPage}`}>
				<div className="bgnull"></div>
				{this.children}
			</section>
		)
	}
}

export default PageBody