import React from 'preact'
import { connect } from "react-redux";
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'
import { css } from "@emotion/react"
import LosantForm from './contact-form/LosantForm'
import Confirmation from './confirmation/confirmation'

const heroCopy = css`
	h2 {
		color: #fff;
		margin: 0;
	}
`

const heroBody = css`
	margin-top: 50px;

	h2 {
		color: #0510A0;
		display: inline-block;
		left: 50%;
		position: relative;
		transform: translateX(-50%);

		&:after {
			border-bottom: 3px solid #FF495C;
			content: '';
			display: block;
			left: 50%;
			margin-top: 10px;
			position: relative;
			transform: translateX(-50%);
			width: 50%;
		}
	}

	p {
		font-size: 22px;
		line-height: 26.4px;
	}

	.GrayBG {
		background-color: #F2F2F2;
		color: #0510A0;
		display: block;
		font-weight: 600;
		padding: 35px;
		@media (min-width: 768px) {
			padding: 55px;
		}
	}
`

const heroCta = css`
	p {
		color: #0510A0;
		font-size: 22px;
		font-weight: 700;
		line-height: 26.4px;
	}
`

const formBody = css`
	margin-top: 50px;
	padding: 55px;
	@media (min-width: 1024px) {
		margin-top: 0;
	}
	

	h2 {
		color: #0510A0;
		display: inline-block;
		left: 50%;
		position: relative;
		text-transform: uppercase;
		transform: translateX(-50%);

		&:after {
			border-bottom: 3px solid #0BD3CD;
			content: '';
			display: block;
			left: 50%;
			margin-top: 10px;
			position: relative;
			transform: translateX(-50%);
			width: 50%;
		}
	}
`

const Partner = props => {
	const liveData = props.partnerData.data.prismicCampaignTemplate.data
	return(
		<div>
			<div
				className="partners-head"
				css={
					css`
						border-bottom: 27px solid #000000;
					`
				}
				id="partners-head"
			>
				<BackgroundImage
					fluid={liveData.partner_hero.localFile.childImageSharp.fluid}
					Tag="div"
				>
					<div 
						className="container"
						css={
							css`
								margin-top: 81px;
								padding: 25.4vw 32px 17.4vw;
								@media (min-width: 768px) {
									padding: 11.4vw 32px 10.4vw;
								}
							`
						}
					>
						<div className="partner-logo" css={css`margin-bottom: 25px; max-width: 400px;`}>
							<Img 
								alt={liveData.partner_logo.alt}
								fluid={liveData.partner_logo.localFile.childImageSharp.fluid}
								imgStyle={{
									height: 'auto'
								}}
							/>
						</div>
						<div css={heroCopy} dangerouslySetInnerHTML={{ __html: liveData.partner_hero_copy.html }} />
					</div>
				</BackgroundImage>
			</div>

			<div 
				className="partners-body"
				css={
					css`
						margin: 15vw 0;
						@media (min-width: 768px) {
							margin: 7vw 0;
						}
					`
				}
			>
				<div 
					className="container"
					css={
						css`
							background-color: #ffffff;
							padding: 0;
							@media (min-width: 1024px) {
								align-items: stretch;
								display: flex;
							}
						`
					}
				>
					<div css={css`flex: 1`} className="column">
						<BackgroundImage
							className="pb-header"
							css={
								css`
									padding: 25vw 4vw;
									@media (min-width: 1024px) {
										padding: 14vw 4vw;
									}
								`
							}
							fluid={liveData.partner_container_hero.localFile.childImageSharp.fluid}
							Tag="div"
						>
							<Img 
								alt={liveData.partner_logo.alt}
								fluid={liveData.partner_logo.localFile.childImageSharp.fluid}
								imgStyle={{
									height: 'auto'
								}}
							/>
						</BackgroundImage>
						<div className="container">
							<div 
								className="pb-body"
								css={heroBody}
							>
								<div dangerouslySetInnerHTML={{ __html: liveData.partner_body.html }} />
							</div>
							<div 
								className="pb-cta"
								css={heroCta}
							>
								<div dangerouslySetInnerHTML={{ __html: liveData.partner_cta_copy.html }} />
							</div>
						</div>
					</div>
					<div css={css`background-color: #F2F2F2; flex: 1`} className="column">
						<div
							className="losant-form"
							css={formBody}
						>
							<div className="form-header">
								<h2>Request a quote</h2>
								<p css={
									css`
										color: #0510A0; 
										font-size: 22px; 
										line-height: 26.4px;
								`}>
									Skylytics<sup>®</sup> can help interpret data into actionable insights that support your critical business decisions. Contact us to learn more about how we leverage the Losant IoT Enterprise Platforms.
								</p>
							</div>
							<div>
								{!props.losantFormSubmit && <LosantForm />}
								{props.losantFormSubmit && <Confirmation confirmMsg="We'll be in touch with you shortly." />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	losantFormSubmit: state.app.losantFormSubmit,
})

export default connect(mapStateToProps,null)(Partner)
