import React from 'react'
import axios from 'axios'

import MailSvg from '../svg/mail_icon.svg'

import '../contact.scss'

export default class ContactForm extends React.Component {

    state = {
        "email": {
            "value":'',
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
            if (formSubmission[data].value === '' && data !== 'postnobills') {
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
                    "email": "noreply@skylytics.com"
                },
                "personalizations": [
                    {
                      "to": [
                        {
                          "email": "bryan@3pt.design"
                        }
                      ],
                      "subject": "A newsletter subscription from the Skylytics form" 
                    }
                ],
                "content": [
                    {
                        "type": "text/plain",
                        "value": `Good news, everyone! We just got a newsletter subscription from the Skylytics form from ${this.state.email.value }`
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
                window.location.replace('/contact-us-success');
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
                <h2><MailSvg />Contact Us</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        onChange={this.handleInputChange}
                        placeholder="Email"
                        type="text"
                        value={this.state.email.value}
                    />
                    <p className="validation-message">{this.validationMessage()}</p>
                    <p className="validation-email">This doesn't seem to be a valid email address.</p>
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
                    <div className="row submit-container">
                        <button className="cta" type="submit">Subscribe</button>
                    </div>
                </form>
            </div>
            )
        }
    }
