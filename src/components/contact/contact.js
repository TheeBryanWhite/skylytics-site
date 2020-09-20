import React from 'react'
import LazyLoad from 'react-lazyload'
import ContactForm from './contact-form/ContactForm'

import DemoSvg from './svg/demo_icon.svg'

const ContactUs = props => {
	return(
	<section className="contact">
		<button className="anchor-offset" id="contact-us"></button>
			<div className="bgblue">
				<div className="bgblack form-container columns">
					<div className="container">
						<div className="column">
							<ContactForm />
						</div>
						<div className="contact-content column">
							<div dangerouslySetInnerHTML={{ __html: props.contactUsBody.header.html }} />
							<h3><DemoSvg />{props.contactUsBody.demo_title.text}</h3>
							<div dangerouslySetInnerHTML={{ __html: props.contactUsBody.demo.html }} />
							<div dangerouslySetInnerHTML={{ __html: props.contactUsBody.newsletter.html }} />
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
					<div 
						className="contact-footer container"
						dangerouslySetInnerHTML={{ __html: props.contactUsBody.footer.html }}
					/>
				</div>
			</div>
		</section>
	)
}

export default ContactUs