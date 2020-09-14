import React from 'react'
import ContactForm from './contact-form/ContactForm'

import DemoSvg from './svg/demo_icon.svg'

const ContactUs = () => {
	return(
		<section className="contact" id="contact-us">
			<div className="bgblue">
				<div className="bgblack form-container columns">
					<div className="container">
						<div className="column">
							<ContactForm />
						</div>
						<div className="contact-content column">
							<h2>Let's get started</h2>
							<p>When it comes CI/Analytics/IoT for your business, you need an expert tea,. Contact us to discusss how Skylytics can interpret your data needs. Let us be your bridge to success.</p>
							<h3><DemoSvg />Schedule a Demo</h3>
							<p>Please follow the below link to complete the demo request and Skylytics representative will be in contact with you shortly.</p>
							<p><a className="cta" href="/" target="_blank" rel="noreferrer">Schedule a Demo</a></p>
							<h3 className="newsletter">Join our newsletter</h3>
							<p>By providing your email address, you are consenting to receive news, updates, and other information concerning Skylytics and our products. You may withdraw your consent at any time by using our unsubscribe feature.</p>
							<div className="newsletter-subscribe">
								<form>
								<label htmlFor="email">Email</label>
								<input
									id="email"
									name="email"
									placeholder="Enter your Email"
									type="text"
								/>
								<div className="row submit-container">
									<button className="cta" type="submit">Subscribe</button>
								</div>
								</form>
							</div>
						</div>
					</div>
					<div className="contact-footer container">
						<h3>Just in case you’re wondering...<br />2.5 Quintillion is 2,500,000,000,000,000,000</h3>
						<p>That’s a lot of data, we are here to help.</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactUs