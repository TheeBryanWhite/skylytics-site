import React from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { contactFormSubmit } from '../../../redux/actions/actions'

import MailSvg from '../svg/mail_icon.svg'

import '../contact.scss'

class ContactForm extends React.Component {

    state = {
        "name": {
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
        "message": {
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
                          "email": "info@skylytics.com"
                        }
                      ],
                      "subject": "A submission from the Skylytics contact form from " + this.state.company.value 
                    }
                ],
                "content": [
                    {
                        "type": "text/plain",
                        "value": `Good news, everyone! We just got a submission from the Skylytics contact form from ${this.state.name.value }\n\nEmail: ${this.state.email.value }\nPhone: ${this.state.phone.value }\nCompany: ${this.state.company.value}\n\nMessage\n${this.state.message.value}`
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
                this.props.contactFormSubmit(true)
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
                    <div className="row">
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name"
                            name="name"
                            onChange={this.handleInputChange}
                            placeholder="Name"
                            type="text"
                            value={this.state.name.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="row">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone" 
                            name="phone"
                            onChange={this.handleInputChange}
                            placeholder="Phone"
                            type="text"
                            value={this.state.phone.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="company">Company</label>
                        <input
                            id="company"
                            name="company"
                            onChange={this.handleInputChange}
                            placeholder="Company"
                            type="text"
                            value={this.state.company.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message" 
                            name="message"
                            onChange={this.handleInputChange}
                            placeholder="Message"
                            rows="5"
                            value={this.state.message.value}
                        />
                        <p className="validation-message">{this.validationMessage()}</p>
                    </div>
                    <div className="row">
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
                    <div className="row submit-container">
                        <button className="cta" type="submit">We Want To Hear Your Story</button>
                    </div>
                </form>
            </div>
            )
        }
    }

const mapStateToProps = state => ({
    contactFormSubmit: state.app.contactFormSubmit
})

export default connect(mapStateToProps, { contactFormSubmit })(ContactForm)
