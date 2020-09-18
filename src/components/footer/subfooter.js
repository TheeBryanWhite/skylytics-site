import React from "react"
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import { setCurrentPage } from '../../redux/actions/actions'

const theDate = new Date()
const theYear = theDate.getFullYear();

const Subfooter = props => {
	
	const clickHandler = page => {
		props.setCurrentPage('legal')
		return false
	}

	return(
		<div className="subfooter container">
			<div className="copyright">
				<p>&copy; {theYear} Skylytics<span>&reg;</span> Data LLC | All Rights Reserved</p>
			</div>
			<p><Link
				onClick={() => {clickHandler()}}
				to="/legal">Legal Aspects, Privacy Policy, Terms &amp; Conditions</Link></p>
		</div>
	)
}

const mapStateToProps = state => ({
	currentPage: state.app.currentPage
})
  
export default connect(mapStateToProps, { setCurrentPage })(Subfooter)