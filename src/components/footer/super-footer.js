import React from "react"
import SkylyticsLogoSvg from './svg/sky-logo.svg'

const SuperFooter = () => {
	return(
		<div className="super-footer">
			<div className="container">
				<h1><SkylyticsLogoSvg /><span>Skylytics, LLC</span></h1>
          		<p>Leveraging the power of <b>CI</b></p>
			</div>
        </div>
	)
}

export default SuperFooter