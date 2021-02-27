import React from 'react'
import axios from 'axios'
import { css } from "@emotion/react"
import { connect } from "react-redux";
import { losantFormSubmit } from '../../../redux/actions/actions'

import '../contact.scss'

const screenReaderText = css`
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	word-wrap: normal !important;
`

const rows = css`
	margin: 35px 65px;

	.validation-message,
	.validation-email {
		color: #FF495C;
		display: none;
		text-align: left;
	}

	.invalid {
		border: 2px solid #FF495C;

		&~ .validation-message {
			display: block;
		}
	}

	.email-invalid {
		border: 2px solid #FF495C;

		&~ .validation-email {
			display: block;
		}
	}
`

const checkBoxes = css`
	[type="checkbox"]:not(:checked),
	[type="checkbox"]:checked {
	position: absolute;
		left: 0;
		opacity: 0.01;
	}

	[type="checkbox"]:not(:checked) + label,
	[type="checkbox"]:checked + label {
		position: relative;
		padding-left: 2.3em;
		font-size: 1.05em;
		line-height: 1.7;
		cursor: pointer;
	}

	[type="checkbox"]:not(:checked) + label:before,
	[type="checkbox"]:checked + label:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 1.4em;
		height: 1.4em;
		border: 1px solid #aaa;
		background: #FFF;
		border-radius: .2em;
		box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 rgba(179, 179, 179, .2);
		-webkit-transition: all .275s;
		transition: all .275s;
	}

	[type="checkbox"]:not(:checked) + label:after,
	[type="checkbox"]:checked + label:after {
		content: '✕';
		position: absolute;
		top: .55em;
		left: .15em;
		font-size: 1.375em;
		color: #0510A0;
		line-height: 0;
		-webkit-transition: all .2s;
		transition: all .2s;
	}

	[type="checkbox"]:not(:checked) + label:after {
		opacity: 0;
		-webkit-transform: scale(0) rotate(45deg);
		transform: scale(0) rotate(45deg);
	}

	[type="checkbox"]:checked + label:after {
		opacity: 1;
		-webkit-transform: scale(1) rotate(0);
		transform: scale(1) rotate(0);
	}

	[type="checkbox"]:disabled:not(:checked) + label:before,
	[type="checkbox"]:disabled:checked + label:before {
		box-shadow: none;
		border-color: #bbb;
		background-color: #e9e9e9;
	}

	[type="checkbox"]:disabled:checked + label:after {
		color: #777;
	}

	[type="checkbox"]:disabled + label {
		color: #aaa;
	}

	[type="checkbox"]:checked:focus + label:before,
	[type="checkbox"]:not(:checked):focus + label:before {
		box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 6px rgba(179, 179, 179, .2);
	}
`

const inputs = css`
	border: 1px solid #0510A0;
	padding: 25px;
	width: 100%;

	&:focus{
		border: 1px solid #0BD3CD;
		color: #0BD3CD;
		outline: none;

		&::-webkit-input-placeholder {
			color: #0BD3CD;
		}
	
		&::-moz-placeholder {
			color: #0BD3CD;
		}
	
		&:-ms-input-placeholder {
			color: #0BD3CD;
		}
	
		&:-moz-placeholder {
			color: #0BD3CD;
		}
	}

	&::-webkit-input-placeholder {
		color: #0510A0;
	}

	&::-moz-placeholder {
		color: #0510A0;
	}

	&:-ms-input-placeholder {
		color: #0510A0;
	}

	&:-moz-placeholder {
		color: #0510A0;
	}
`

const postNoBills = css`
	display: none;
`

class LosantForm extends React.Component {

    state = {
        "firstname": {
            "value":'',
            "valid": false
		},
		"lastname": {
            "value":'',
            "valid": false
		},
		"jobtitle": {
            "value":'',
            "valid": false
        },
        "email": {
            "value":'',
            "valid": false
        },
        "phone": {
            "value":'',
            "valid": false
        },
        "company": {
            "value":'',
            "valid": false
		},
		"joblevel": {
            "value":'',
            "valid": false
		},
		"country": {
            "value":'',
            "valid": false
        },
        "message": {
            "value":'',
            "valid": false
		},
		"optin": {
            "value":false,
            "valid": false
        },
        "postnobills": {
            "value":'',
            "valid": true
        }
    }

    // Update the form state on input change
    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: {
                "valid": true,
                "value": value
            },
        })

        // Remove the invalid classes on the input fields
        document.getElementById(name).classList.remove('invalid');
        document.getElementById(name).classList.remove('email-invalid');

    }

    isEmailValid = email => {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z0-9_\-\.]+)$/;  // eslint-disable-line no-useless-escape
        return pattern.test(email.toLowerCase());
    }

    validateForm = () => {
        const formSubmission = { ...this.state};

        // Shoot through the form values
        // Set the valid status to false if any fields are blank
        // Add the invalid class to the relevant input
        for (const data in formSubmission) {
            // If any of the values are blank, set the valid status false
            if ((formSubmission[data].value === '' || formSubmission[data].value === false ) && data !== 'postnobills') {
                formSubmission[data].valid = false
                this.setState({formSubmission});
                document.getElementById(data).classList.add('invalid');
                return false;
            } else if (data === 'email') {
                if (!this.isEmailValid(formSubmission[data].value)) {
                    formSubmission[data].valid = false;
                    this.setState({formSubmission});
                    document.getElementById(data).classList.add('email-invalid');
                    return false;
                }
            }
        }

        // Loop again, if any fields are invalid, don't submit the form
        for (const data in formSubmission) {
            // if any of the valid statuses are set to false, bail out
            if (formSubmission[data].valid !== false) {
                return true;
            }
        }
    }

    validationMessage = () => { 
        return 'This field is required.';
    }

    handleSubmit = event => {
		event.preventDefault()

        // First check to see if stupid bots are filling out the form
        if (!this.state.postnobills.length > 0) {

            const formData = {
                "from": {
                    "email": "info@skylytics.com"
                },
                "personalizations": [
                    {
                        "to": [
                            {
                                "email": "info@skylytics.com"
                            }
                        ],
                        "from": {
                            "email": "info@skylytics.com"
                        },
                        "subject": 'A new submission from the Losant Partner form',
                    }
                ],
                "content": [
                    {
                        "type": "text/plain",
                        "value": `First Name: ${this.state.firstname.value}\nLast Name: ${this.state.lastname.value}\nJob Title: ${this.state.jobtitle.value}\nEmail: ${this.state.email.value}\nPhone: ${this.state.phone.value}\nCompany: ${this.state.company.value}\nJob Level: ${this.state.joblevel.value}\nCountry: ${this.state.country.value}\nMessage: ${this.state.message.value}`
                    },
                    {
                        "type": "text/html",
                        "value": `First Name: ${this.state.firstname.value}<br />Last Name: ${this.state.lastname.value}<br />Job Title: ${this.state.jobtitle.value}<br />Email: ${this.state.email.value}<br />Phone: ${this.state.phone.value}<br />Company: ${this.state.company.value}<br />Job Level: ${this.state.joblevel.value}<br />Country: ${this.state.country.value}<br />Message: ${this.state.message.value}`
                    }
                ]
            }

			let isThisValid = this.validateForm();

            if (!isThisValid) {
                return false;
            }

            axios.post(
                'https://slmailsend.azurewebsites.net/send', formData, {
                headers: { 
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            }).then(response => {
                this.props.losantFormSubmit(true)
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        } else {
            // No bots allowed.
            console.log("See you space cowboy");
        }
    }

    render () {
        return (
            <div className="cf-container">
                <form onSubmit={this.handleSubmit}>
                    <div
						className="row"
						css={rows}
					>
						<label 
							css={screenReaderText}
							htmlFor="firstname"
						>
							First Name
						</label>
						<input 
							css={inputs}
                            id="firstname"
                            name="firstname"
                            onChange={this.handleInputChange}
                            placeholder="First Name*"
                            type="text"
                            value={this.state.firstname.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
					<div
						className="row"
						css={rows}
					>
						<label 
							css={screenReaderText}
							htmlFor="lastname"
						>
							Last Name
						</label>
						<input 
							css={inputs}
                            id="lastname"
                            name="lastname"
                            onChange={this.handleInputChange}
                            placeholder="Last Name*"
                            type="text"
                            value={this.state.lastname.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
					<div
						className="row"
						css={rows}
					>
                        <label
							css={screenReaderText}
							htmlFor="jobtitle"
						>
							Job Title
						</label>
						<input 
							css={inputs}
                            id="jobtitle"
                            name="jobtitle"
                            onChange={this.handleInputChange}
                            placeholder="Job Title*"
                            type="text"
                            value={this.state.jobtitle.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
					<div 
						className="row"
						css={rows}
					>
						<label
							css={screenReaderText}
							htmlFor="email"
						>
							Business Email
						</label>
                        <input
							css={inputs}
                            id="email"
                            name="email"
                            onChange={this.handleInputChange}
                            placeholder="Email*"
                            type="text"
                            value={this.state.email.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                        <p className="validation-email">This doesn't seem to be a valid email address.</p>
                    </div>
                    <div
						className="row"
						css={rows}
					>
                        <label
							css={screenReaderText}
							htmlFor="phone"
						>
							Phone Number
						</label>
                        <input
							css={inputs}
                            id="phone" 
                            name="phone"
                            onChange={this.handleInputChange}
                            placeholder="Phone*"
                            type="text"
                            value={this.state.phone.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
                    <div
						className="row"
						css={rows}
					>
                        <label
							css={screenReaderText}
							htmlFor="company"
						>
							Company
						</label>
                        <input
							css={inputs}
                            id="company"
                            name="company"
                            onChange={this.handleInputChange}
                            placeholder="Company*"
                            type="text"
                            value={this.state.company.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
					<div
						className="row"
						css={rows}
					>
						<label 
							css={screenReaderText}
							htmlFor="joblevel"
						>
							Job Level
						</label>
                        <input
							css={inputs}
                            id="joblevel"
                            name="joblevel"
                            onChange={this.handleInputChange}
                            placeholder="Job Level*"
                            type="text"
                            value={this.state.joblevel.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
					<div
						className="row"
						css={rows}
					>
                        <label
							css={screenReaderText}
							htmlFor="country"
						>
							Country
						</label>
                        <input
							css={inputs}
                            id="country"
                            name="country"
                            onChange={this.handleInputChange}
                            placeholder="Country*"
                            type="text"
                            value={this.state.country.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
                    <div
						className="row"
						css={rows}
					>
                        <label
							css={screenReaderText}
							htmlFor="message"
						>
							Where are you in your IoT journey?
						</label>
                        <textarea
							css={inputs}
                            id="message" 
                            name="message"
                            onChange={this.handleInputChange}
                            placeholder="Where are you in your IoT journey?*"
                            rows="5"
                            value={this.state.message.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
					<div
						className="row"
						css={[rows, checkBoxes]}
					>
						<div className="legal">
							<p css={css`color: #B3B3B3;`}>To provide the content you've requested, we must process and store your personal data. Please check the box below to provide your consent to receive emails from Skylytics. You may unsubscribe at any time.</p>
						</div>
						<input 
							id="optin"
							name="optin"
							onChange={this.handleInputChange}
							type="checkbox"
							value="optin"
						/>
						<label css={css`color: #B3B3B3;`} for="optin">By checking this box, I consent to receiving email messages from Skylytics</label>
						<p className="validation-message">{this.validationMessage()}</p>
                        <div css={css`margin-top: 25px;`}className="opt-out">
							<p css={css`color: #B3B3B3; font-size: 12px;`}>To opt out or learn more about how Skylytics is committed to protecting and respecting your privacy, please review our <a css={css`color: #0510A0; font-weight: 700;`} href="/legal" target="_blank" rel="noreferrer">Privacy Policy</a>.</p>
						</div>
                    </div>
					<div 
						className="row"
						css={[rows, postNoBills]}
					>
                        <label htmlFor="postnobills">postnobills</label>
                        <input
                            className="postnobills"
                            id="postnobills"
                            name="postnobills"
                            onChange={this.handleInputChange}
                            placeholder="postnobills"
                            type="text"
                            value={this.state.postnobills.value}
                        />
                    </div>
					<div 
						className="row submit-container"
						css={rows}
					>
                        <button css={css`border: 0; font-weight: 600; text-transform: uppercase;`} className="cta" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            )
        }
    }

const mapStateToProps = state => ({
    losantFormSubmit: state.app.losantFormSubmit
})

export default connect(mapStateToProps, { losantFormSubmit })(LosantForm)
