import React from "react"
import { 
	Link,
	useStaticQuery, 
	graphql
} from 'gatsby'

const FooterLinks = () => {
	const FooterLinksData = useStaticQuery(graphql`
		query FooterLinkQuery {
			site {
				siteMetadata {
					address {
						address1
						address2
						city
						contact
						phone
						state
						zip
					}
					menuLinks {
						class
						link
						name
					}
					socialMedia {
						name,
						url
					}
				}
			}
		}
	`);

	const menu = FooterLinksData.site.siteMetadata.menuLinks
	const address = FooterLinksData.site.siteMetadata.address
	const social = FooterLinksData.site.siteMetadata.socialMedia

	return(
		<div className="footer-links">
          <div className="links-container container">
            <div className="links-col">
              <h2>Menu</h2>
			  <ul>
				{
					menu.map((navItem) => (
						<li key={navItem.name} className={navItem.class}>
							<Link 
							to={navItem.link}
							>
								<span>{navItem.name}</span>
							</Link>
						</li>
					))
				}
			  </ul>
            </div>
            <div className="links-col">
              <h2>Social Media</h2>
			  <ul>
				{
					social.map((social) => (
						<li key={social.name}>
							<a href={social.url} target="_blank" rel="noreferrer">{social.name}</a>
						</li>
					))
				}
			  </ul>
            </div>
            <div className="links-col">
              <h2>Connect</h2>
			  <p>
				{address.address1}<br />
				{address.address2}<br />
				{address.city}, {address.state} {address.zip}<br />
				{address.phone}
			  </p>
			  <p><a href={`mailto:${address.contact}`}>{address.contact}</a></p>
            </div>
          </div>
        </div>
	)
}

export default FooterLinks