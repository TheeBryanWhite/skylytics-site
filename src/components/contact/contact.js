import React from 'react'
import { connect } from "react-redux";

import ContactForm from './contact-form/ContactForm'
import NewsletterForm from './newsletter-form/NewsletterForm'
import Confirmation from './confirmation/confirmation'

import DemoSvg from './svg/demo_icon.svg'

const ContactUs = props => {
	return(
	<section className="contact">
		<button className="anchor-offset" id="contact-us">Contact Us Section</button>
			<div className="bgblue">
				<div className="bgblack form-container columns contact-column">
					<div className="container">
						<div className="column">
							{!props.contactFormSubmit && <ContactForm />}
							{props.contactFormSubmit && <Confirmation confirmMsg="We'll be in touch with you shortly." />}
						</div>
						<div className="contact-content column newsletter-column">
							<div dangerouslySetInnerHTML={{ __html: props.contactUsBody.header.html }} />
							<h3><DemoSvg />{props.contactUsBody.demo_title.text}</h3>
							<div dangerouslySetInnerHTML={{ __html: props.contactUsBody.demo.html }} />
							<div dangerouslySetInnerHTML={{ __html: props.contactUsBody.newsletter.html }} />
							<div className="newsletter-subscribe">
							{!props.newsletterFormSubmit && <NewsletterForm />}
							{props.newsletterFormSubmit && <Confirmation confirmMsg="Watch your inbox for new updates." />}
							</div>
						</div>
					</div>
					<div 
						className="contact-footer container"
						dangerouslySetInnerHTML={{ __html: props.contactUsBody.footer.html }}
					/>
				</div>
			</div>
		</section>
	)
}

const mapStateToProps = state => ({
	contactFormSubmit: state.app.contactFormSubmit,
	newsletterFormSubmit: state.app.newsletterFormSubmit
})

export default connect(mapStateToProps,null)(ContactUs)