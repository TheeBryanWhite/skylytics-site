import React from 'react'

const Confirmation = props => {
	return(
	<div className="form-confirmation">
		<h3>Success! {props.confirmMsg}</h3>
	</div>
	)
}

export default Confirmation