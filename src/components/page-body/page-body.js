import React, {Component} from 'react'
import { connect } from 'react-redux'

import './page-body.scss'

class PageBody extends Component {
	constructor(props) {
		super(props)
		this.children = props.children
	}
	
	render() {
		return(
			<section id={`page-${this.props.currentPage}`} className={`page-body page-${this.props.currentPage}`}>
				<div className="bgnull"></div>
				{this.children}
			</section>
		)
	}
}
  
const mapStateToProps = state => ({
	currentPage: state.app.currentPage,
})

export default connect(mapStateToProps, null)(PageBody)