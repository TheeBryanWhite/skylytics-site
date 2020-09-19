import React from 'react'
import {Link} from 'gatsby'
import { connect } from 'react-redux'
import SkylyticsLogoSvg from './svg/sky-logo.svg'
import {setCurrentPage} from '../../redux/actions/actions'

const SuperFooter = props => {
	const clickHandler = () => {
		props.setCurrentPage('home')
	}

	return(
		<div className="super-footer">
			<div className="container">
				<h1>
					<Link 
						onClick={() => {clickHandler()}}
						to="/"
					><SkylyticsLogoSvg /><span>Skylytics, LLC</span></Link></h1>
          		<p>Leveraging the power of <b>CI</b></p>
			</div>
        </div>
	)
}

const mapStateToProps = state => ({ currentPage: state.app.currentPage })
  
export default connect(mapStateToProps,{setCurrentPage})(SuperFooter)