import React from "react"
import { Link } from 'gatsby'

const theDate = new Date()
const theYear = theDate.getFullYear();

const Subfooter = () => {
	return(
		<div className="subfooter container">
			<div className="copyright">
				<p>&copy; {theYear} Skylytics<span>&reg;</span> Data LLC | All Rights Rerved</p>
			</div>
			<p><Link to="/">Legal Aspects</Link></p>
			<p><Link to="/">Privacy Policy</Link></p>
			<p><Link to="/">Terms &amp; Conditions</Link></p>
		</div>
	)
}

export default Subfooter