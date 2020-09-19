import React from 'react'
import {Link} from 'gatsby'
import SkylyticsLogoSvg from './svg/sky-logo.svg'

const SuperFooter = props => {
	return(
		<div className="super-footer">
			<div className="container">
				<h1>
					<Link to="/"><SkylyticsLogoSvg /><span>Skylytics, LLC</span></Link></h1>
          		<p>Leveraging the power of <b>CI</b></p>
			</div>
        </div>
	)
}
  
export default SuperFooter