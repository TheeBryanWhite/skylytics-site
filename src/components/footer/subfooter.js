import React from "react"
import { Link } from 'gatsby'

const theDate = new Date()
const theYear = theDate.getFullYear();

const Subfooter = props => {

	return(
		<div className="subfooter container">
			<div className="copyright">
				<p>&copy; {theYear} Skylytics<span>&reg;</span> Data LLC | All Rights Reserved</p>
			</div>
			<p><Link to="/legal">Legal Aspects, Privacy Policy, Terms &amp; Conditions</Link></p>
		</div>
	)
}
  
export default Subfooter