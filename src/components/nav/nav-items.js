import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { 
	setMenu,
	setCurrentPage
 } from '../../redux/actions/actions'

const NavItems = (props) => {
	let menu = useStaticQuery(graphql`
		query SiteNavQuery {
			site {
				siteMetadata {
					menuLinks {
						class
						name
						link
					}
				}
			}
		}
	`);

	  menu = menu.site.siteMetadata.menuLinks
	  
	const clickHandler = page => {
		if (page === 'about-us' || page === 'case-stories' || page === 'solutions' || page === 'contact-us') {
			page = 'home'
		}

		props.setCurrentPage(page)
		props.setMenu(props.menuState)
		return false
	}

	return (
		<ul className={`${props.menuState ? 'active-menu' : ''}`}>
			{
			menu.map((navItem)=> (
			// <li key={navItem.name} className={navItem.class}>
			<li key={navItem.name} className={ navItem.class }>
				<Link 
				activeClassName="active-link"
				onClick={() => clickHandler(navItem.class)}
				to={navItem.link}
				>
				<span>{navItem.name}</span>
				</Link>
			</li>
			))
			}
		</ul>
	)
}

NavItems.propTypes = {
    menu: PropTypes.string,
}
  
NavItems.defaultProps = {
    menu: ``,
}

const mapStateToProps = state => ({
	currentPage: state.app.currentPage,
	menuState: state.app.menuState
})
  
export default connect(mapStateToProps, { setMenu, setCurrentPage })(NavItems)