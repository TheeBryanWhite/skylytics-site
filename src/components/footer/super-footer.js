import React from "react"
import SkylyticsSvg from './svg/sky_footer_logo_wht.svg'

const SuperFooter = () => {
	return(
		<div className="super-footer">
			<div className="container">
				<h1><SkylyticsSvg /><span>Skylytics, LLC</span></h1>
          		<p>Leveraging the power of <b>CI</b></p>
			</div>
        </div>
	)
}

export default SuperFooter