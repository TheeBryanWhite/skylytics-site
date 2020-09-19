import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { setMenu } from '../../redux/actions/actions'

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
	  
	const clickHandler = () => {
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
				onClick={() => clickHandler()}
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
	menuState: state.app.menuState
})
  
export default connect(mapStateToProps, { setMenu })(NavItems)