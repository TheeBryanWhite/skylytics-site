import React from 'preact'

const TextField = props => {
	const label = props.input.primary.label
	let fieldName = props.input.primary.label.toLowerCase()
		fieldName = fieldName.replace(/\s/g, '')
	
	let validationMessage = 'This field is required.'
	if (props.input.primary.validation_text) {
		validationMessage = props.input.primary.validation_text
	}

	const handleInputChange = event => {
		props.onValChange({
			'id': props.input.id,
			'label': label,
			'required': props.input.primary.required,
			'valid': props.input.primary.valid,
			'value': event
		})
	}

	const fieldVal = props.fieldValue

	return(
		<div className="row">
			<label htmlFor="name">{label}</label>
			<input 
				id={props.id}
				name={fieldName}
				onChange={event => handleInputChange(event.target.value)}
				placeholder={label}
				type="text"
				value={fieldVal}
			/>
			<p className="validation-message">{validationMessage}</p>
		</div>
	)
}

export default TextField