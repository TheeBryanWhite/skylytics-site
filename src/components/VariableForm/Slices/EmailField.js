import React from 'preact'

const EmailField = props => {
	const label = props.input.primary.label
	let fieldName = label
		fieldName = fieldName.replace(/\s/g, '')
	
	let validationMessage = 'This field is required.'
	if (props.input.primary.validation_text) {
		validationMessage = props.input.primary.validation_text
	}
	return(
		<div className="row">
			<label htmlFor="name">{label}</label>
			<input 
				id={props.id}
				name={fieldName}
				placeholder={label}
				type="text"
			/>
			<p className="validation-message">{validationMessage}</p>
		</div>
	)
}

export default EmailField