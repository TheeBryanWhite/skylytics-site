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
	margin: 35px 0;
	@media (min-width: 768px) {
		margin: 35px 65px;
	}

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

const selectList = css`
	border: 1px solid #0510A0;
	color: #0510A0;
	display: block;
	line-height: 1.3;
	padding: .6em 1.4em .5em .8em;
	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	padding: 20px 25px;

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
`

const inputs = css`
	border: 1px solid #0510A0;
	padding: 20px 25px;
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
						<select 
							css={selectList}
							id="country" 
							name="country"
							onChange={this.handleInputChange}
							value={this.state.country.value}
						>
							<option value="">Country*</option>
							<option value="Afganistan">Afghanistan</option>
							<option value="Albania">Albania</option>
							<option value="Algeria">Algeria</option>
							<option value="American Samoa">American Samoa</option>
							<option value="Andorra">Andorra</option>
							<option value="Angola">Angola</option>
							<option value="Anguilla">Anguilla</option>
							<option value="Antigua & Barbuda">Antigua & Barbuda</option>
							<option value="Argentina">Argentina</option>
							<option value="Armenia">Armenia</option>
							<option value="Aruba">Aruba</option>
							<option value="Australia">Australia</option>
							<option value="Austria">Austria</option>
							<option value="Azerbaijan">Azerbaijan</option>
							<option value="Bahamas">Bahamas</option>
							<option value="Bahrain">Bahrain</option>
							<option value="Bangladesh">Bangladesh</option>
							<option value="Barbados">Barbados</option>
							<option value="Belarus">Belarus</option>
							<option value="Belgium">Belgium</option>
							<option value="Belize">Belize</option>
							<option value="Benin">Benin</option>
							<option value="Bermuda">Bermuda</option>
							<option value="Bhutan">Bhutan</option>
							<option value="Bolivia">Bolivia</option>
							<option value="Bonaire">Bonaire</option>
							<option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
							<option value="Botswana">Botswana</option>
							<option value="Brazil">Brazil</option>
							<option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
							<option value="Brunei">Brunei</option>
							<option value="Bulgaria">Bulgaria</option>
							<option value="Burkina Faso">Burkina Faso</option>
							<option value="Burundi">Burundi</option>
							<option value="Cambodia">Cambodia</option>
							<option value="Cameroon">Cameroon</option>
							<option value="Canada">Canada</option>
							<option value="Canary Islands">Canary Islands</option>
							<option value="Cape Verde">Cape Verde</option>
							<option value="Cayman Islands">Cayman Islands</option>
							<option value="Central African Republic">Central African Republic</option>
							<option value="Chad">Chad</option>
							<option value="Channel Islands">Channel Islands</option>
							<option value="Chile">Chile</option>
							<option value="China">China</option>
							<option value="Christmas Island">Christmas Island</option>
							<option value="Cocos Island">Cocos Island</option>
							<option value="Colombia">Colombia</option>
							<option value="Comoros">Comoros</option>
							<option value="Congo">Congo</option>
							<option value="Cook Islands">Cook Islands</option>
							<option value="Costa Rica">Costa Rica</option>
							<option value="Cote DIvoire">Cote DIvoire</option>
							<option value="Croatia">Croatia</option>
							<option value="Cuba">Cuba</option>
							<option value="Curaco">Curacao</option>
							<option value="Cyprus">Cyprus</option>
							<option value="Czech Republic">Czech Republic</option>
							<option value="Denmark">Denmark</option>
							<option value="Djibouti">Djibouti</option>
							<option value="Dominica">Dominica</option>
							<option value="Dominican Republic">Dominican Republic</option>
							<option value="East Timor">East Timor</option>
							<option value="Ecuador">Ecuador</option>
							<option value="Egypt">Egypt</option>
							<option value="El Salvador">El Salvador</option>
							<option value="Equatorial Guinea">Equatorial Guinea</option>
							<option value="Eritrea">Eritrea</option>
							<option value="Estonia">Estonia</option>
							<option value="Ethiopia">Ethiopia</option>
							<option value="Falkland Islands">Falkland Islands</option>
							<option value="Faroe Islands">Faroe Islands</option>
							<option value="Fiji">Fiji</option>
							<option value="Finland">Finland</option>
							<option value="France">France</option>
							<option value="French Guiana">French Guiana</option>
							<option value="French Polynesia">French Polynesia</option>
							<option value="French Southern Ter">French Southern Ter</option>
							<option value="Gabon">Gabon</option>
							<option value="Gambia">Gambia</option>
							<option value="Georgia">Georgia</option>
							<option value="Germany">Germany</option>
							<option value="Ghana">Ghana</option>
							<option value="Gibraltar">Gibraltar</option>
							<option value="Great Britain">Great Britain</option>
							<option value="Greece">Greece</option>
							<option value="Greenland">Greenland</option>
							<option value="Grenada">Grenada</option>
							<option value="Guadeloupe">Guadeloupe</option>
							<option value="Guam">Guam</option>
							<option value="Guatemala">Guatemala</option>
							<option value="Guinea">Guinea</option>
							<option value="Guyana">Guyana</option>
							<option value="Haiti">Haiti</option>
							<option value="Hawaii">Hawaii</option>
							<option value="Honduras">Honduras</option>
							<option value="Hong Kong">Hong Kong</option>
							<option value="Hungary">Hungary</option>
							<option value="Iceland">Iceland</option>
							<option value="Indonesia">Indonesia</option>
							<option value="India">India</option>
							<option value="Iran">Iran</option>
							<option value="Iraq">Iraq</option>
							<option value="Ireland">Ireland</option>
							<option value="Isle of Man">Isle of Man</option>
							<option value="Israel">Israel</option>
							<option value="Italy">Italy</option>
							<option value="Jamaica">Jamaica</option>
							<option value="Japan">Japan</option>
							<option value="Jordan">Jordan</option>
							<option value="Kazakhstan">Kazakhstan</option>
							<option value="Kenya">Kenya</option>
							<option value="Kiribati">Kiribati</option>
							<option value="Korea North">Korea North</option>
							<option value="Korea Sout">Korea South</option>
							<option value="Kuwait">Kuwait</option>
							<option value="Kyrgyzstan">Kyrgyzstan</option>
							<option value="Laos">Laos</option>
							<option value="Latvia">Latvia</option>
							<option value="Lebanon">Lebanon</option>
							<option value="Lesotho">Lesotho</option>
							<option value="Liberia">Liberia</option>
							<option value="Libya">Libya</option>
							<option value="Liechtenstein">Liechtenstein</option>
							<option value="Lithuania">Lithuania</option>
							<option value="Luxembourg">Luxembourg</option>
							<option value="Macau">Macau</option>
							<option value="Macedonia">Macedonia</option>
							<option value="Madagascar">Madagascar</option>
							<option value="Malaysia">Malaysia</option>
							<option value="Malawi">Malawi</option>
							<option value="Maldives">Maldives</option>
							<option value="Mali">Mali</option>
							<option value="Malta">Malta</option>
							<option value="Marshall Islands">Marshall Islands</option>
							<option value="Martinique">Martinique</option>
							<option value="Mauritania">Mauritania</option>
							<option value="Mauritius">Mauritius</option>
							<option value="Mayotte">Mayotte</option>
							<option value="Mexico">Mexico</option>
							<option value="Midway Islands">Midway Islands</option>
							<option value="Moldova">Moldova</option>
							<option value="Monaco">Monaco</option>
							<option value="Mongolia">Mongolia</option>
							<option value="Montserrat">Montserrat</option>
							<option value="Morocco">Morocco</option>
							<option value="Mozambique">Mozambique</option>
							<option value="Myanmar">Myanmar</option>
							<option value="Nambia">Nambia</option>
							<option value="Nauru">Nauru</option>
							<option value="Nepal">Nepal</option>
							<option value="Netherland Antilles">Netherland Antilles</option>
							<option value="Netherlands">Netherlands (Holland, Europe)</option>
							<option value="Nevis">Nevis</option>
							<option value="New Caledonia">New Caledonia</option>
							<option value="New Zealand">New Zealand</option>
							<option value="Nicaragua">Nicaragua</option>
							<option value="Niger">Niger</option>
							<option value="Nigeria">Nigeria</option>
							<option value="Niue">Niue</option>
							<option value="Norfolk Island">Norfolk Island</option>
							<option value="Norway">Norway</option>
							<option value="Oman">Oman</option>
							<option value="Pakistan">Pakistan</option>
							<option value="Palau Island">Palau Island</option>
							<option value="Palestine">Palestine</option>
							<option value="Panama">Panama</option>
							<option value="Papua New Guinea">Papua New Guinea</option>
							<option value="Paraguay">Paraguay</option>
							<option value="Peru">Peru</option>
							<option value="Phillipines">Philippines</option>
							<option value="Pitcairn Island">Pitcairn Island</option>
							<option value="Poland">Poland</option>
							<option value="Portugal">Portugal</option>
							<option value="Puerto Rico">Puerto Rico</option>
							<option value="Qatar">Qatar</option>
							<option value="Republic of Montenegro">Republic of Montenegro</option>
							<option value="Republic of Serbia">Republic of Serbia</option>
							<option value="Reunion">Reunion</option>
							<option value="Romania">Romania</option>
							<option value="Russia">Russia</option>
							<option value="Rwanda">Rwanda</option>
							<option value="St Barthelemy">St Barthelemy</option>
							<option value="St Eustatius">St Eustatius</option>
							<option value="St Helena">St Helena</option>
							<option value="St Kitts-Nevis">St Kitts-Nevis</option>
							<option value="St Lucia">St Lucia</option>
							<option value="St Maarten">St Maarten</option>
							<option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
							<option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
							<option value="Saipan">Saipan</option>
							<option value="Samoa">Samoa</option>
							<option value="Samoa American">Samoa American</option>
							<option value="San Marino">San Marino</option>
							<option value="Sao Tome & Principe">Sao Tome & Principe</option>
							<option value="Saudi Arabia">Saudi Arabia</option>
							<option value="Senegal">Senegal</option>
							<option value="Seychelles">Seychelles</option>
							<option value="Sierra Leone">Sierra Leone</option>
							<option value="Singapore">Singapore</option>
							<option value="Slovakia">Slovakia</option>
							<option value="Slovenia">Slovenia</option>
							<option value="Solomon Islands">Solomon Islands</option>
							<option value="Somalia">Somalia</option>
							<option value="South Africa">South Africa</option>
							<option value="Spain">Spain</option>
							<option value="Sri Lanka">Sri Lanka</option>
							<option value="Sudan">Sudan</option>
							<option value="Suriname">Suriname</option>
							<option value="Swaziland">Swaziland</option>
							<option value="Sweden">Sweden</option>
							<option value="Switzerland">Switzerland</option>
							<option value="Syria">Syria</option>
							<option value="Tahiti">Tahiti</option>
							<option value="Taiwan">Taiwan</option>
							<option value="Tajikistan">Tajikistan</option>
							<option value="Tanzania">Tanzania</option>
							<option value="Thailand">Thailand</option>
							<option value="Togo">Togo</option>
							<option value="Tokelau">Tokelau</option>
							<option value="Tonga">Tonga</option>
							<option value="Trinidad & Tobago">Trinidad & Tobago</option>
							<option value="Tunisia">Tunisia</option>
							<option value="Turkey">Turkey</option>
							<option value="Turkmenistan">Turkmenistan</option>
							<option value="Turks & Caicos Is">Turks & Caicos Is</option>
							<option value="Tuvalu">Tuvalu</option>
							<option value="Uganda">Uganda</option>
							<option value="United Kingdom">United Kingdom</option>
							<option value="Ukraine">Ukraine</option>
							<option value="United Arab Erimates">United Arab Emirates</option>
							<option value="United States of America">United States of America</option>
							<option value="Uraguay">Uruguay</option>
							<option value="Uzbekistan">Uzbekistan</option>
							<option value="Vanuatu">Vanuatu</option>
							<option value="Vatican City State">Vatican City State</option>
							<option value="Venezuela">Venezuela</option>
							<option value="Vietnam">Vietnam</option>
							<option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
							<option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
							<option value="Wake Island">Wake Island</option>
							<option value="Wallis & Futana Is">Wallis & Futana Is</option>
							<option value="Yemen">Yemen</option>
							<option value="Zaire">Zaire</option>
							<option value="Zambia">Zambia</option>
							<option value="Zimbabwe">Zimbabwe</option>
						</select>
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
							<p css={css`color: #B3B3B3; font-size: 1.05em;`}>To provide the content you've requested, we must process and store your personal data. Please check the box below to provide your consent to receive emails from Skylytics. You may unsubscribe at any time.</p>
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
							<p css={css`color: #B3B3B3;  font-size: 1.05em;`}>To opt out or learn more about how Skylytics is committed to protecting and respecting your privacy, please review our <a css={css`color: #0510A0; font-weight: 700;`} href="/legal" target="_blank" rel="noreferrer">Privacy Policy</a>.</p>
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
                        <button css={css`border: 0; font-weight: 600; padding: 25px 50px; text-transform: uppercase;`} className="cta" type="submit">Submit</button>
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
