import React, {useEffect} from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import { css } from "@emotion/react"
import { useDispatch } from 'react-redux'
import { setActiveSection, setCurrentPage } from "../redux/actions/actions"

import Layout from '../components/layout/layout'
import Partner from '../components/contact/partners'

const bgNull = css`
	background-color: #0510a0;
	bottom: 0;
	-webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 0 33%);
	clip-path: polygon(0 0, 100% 0, 100% 50%, 0 33%);
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: -1;
`

const PartnerPageTemplate = props => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCurrentPage('partners has-children'))
		dispatch(setActiveSection('partners has-children')) 
	}, [dispatch])

	const liveData = props.data.prismicCampaignTemplate.data
	return(
		<Layout>
			<SEO title={`${liveData.partner_name.text} - Skylytics Partners`} description="" />
			<div css={bgNull} className="bg-null" />
			<Partner partnerData={props} />
		</Layout>
	)
}

export default PartnerPageTemplate

export const query = graphql`
	query PartnersPageQuery($uid: String!) {
		prismicCampaignTemplate(uid: { eq: $uid }) {
			uid
			type
			data {
				partner_hero {
					localFile {
						childImageSharp {
							fluid (maxWidth: 1920) {
								...GatsbyImageSharpFluid_withWebp
							  }
						}
					}
				}
				partner_logo {
					localFile {
						childImageSharp {
							fluid (maxWidth: 600) {
								...GatsbyImageSharpFluid_withWebp
							  }
						}
					}
					alt
				}
				partner_hero_copy {
					html
				}
				partner_container_hero {
					localFile {
						childImageSharp {
							fluid (maxWidth: 800) {
								...GatsbyImageSharpFluid_withWebp
							  }
						}
					}
				}
				partner_body {
					html
				}
				partner_cta_copy {
					html
				}
				partner_name {
					text
					html
				}
				form {
					id
				}
			}
		}
	}
`