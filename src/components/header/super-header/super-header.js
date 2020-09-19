import React from 'react'
import { Link } from 'gatsby'

import Logo from "./svg/sky-logo.svg"
import '../header.scss'

const SuperHeader = () => {	
	return(
		<div className="super-header">
			<div className="container">
			<h1>
				<Link  to="/">
					<Logo />
					<span>skylytics&reg; data llc</span>
				</Link>
			</h1>
			<p>Leveraging the power of <b>CI</b></p>
			</div>
		</div>
	)	
}
  
export default SuperHeader