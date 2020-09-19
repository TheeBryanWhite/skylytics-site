import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import {setCurrentPage} from '../../../redux/actions/actions'

import Logo from "./svg/sky-logo.svg"
import '../header.scss'

const SuperHeader = props => {
	const clickHandler = () => {
		props.setCurrentPage('home')
	}
	
	return(
		<div className="super-header">
			<div className="container">
			<h1>
				<Link 
					onClick={() => {clickHandler()}}
					to="/">
					<Logo />
					<span>skylytics&reg; data llc</span>
				</Link>
			</h1>
			<p>Leveraging the power of <b>CI</b></p>
			</div>
		</div>
	)	
}

const mapStateToProps = state => ({ currentPage: state.app.currentPage })
  
export default connect(mapStateToProps,{setCurrentPage})(SuperHeader)