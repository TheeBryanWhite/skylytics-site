import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { setActiveSection, setMenu } from '../../redux/actions/actions'
import window from 'global/window'

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

	const sectionObj = () => {
		const sections = document.querySelectorAll('.section-anchor')
		const sectionsArr = [].slice.call(sections)
		return sectionsArr
	  }
	
	  const isInViewport= (element, upDown) => {
		const rect = element.getBoundingClientRect();
		let inView = null
	
		if (upDown) {
		  inView = (
			rect.top <= window.innerHeight * .33
		  )
		} else {
		  inView = (
			rect.bottom <= window.innerHeight * .33
		  )
		}
		
		if (inView) {
		  return {"id": element.id, "inView": inView}
		}
	  }
	
	  const theActiveSection = sections => {
		let theSections = null
	
		sections.forEach(section => {
		  if (typeof section === 'undefined' || section.id.length === 0) {
			return false
		  }
	
		  if (
			typeof section !== 'undefined' && 
			section.id.length !== null &&
			section.id.length > 0
		  ) {
			theSections = section.id
		  } 
		})
	
		return theSections
	  }
	
	  let lastScrollTop = 0
	  let scrollDirections = null
	
	  const scrollDirection = () => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop){
			scrollDirections = false // scroll down
		} else {
		  scrollDirections = true // scroll up
		}
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		return scrollDirections
	  }

	window.onscroll = () => {
		let activeSections = []
		
		sectionObj().forEach(section => {
			activeSections.push(isInViewport(section, scrollDirection()))
		})

		let activeSection = theActiveSection(activeSections)

		if (activeSection === 'hero') {
			activeSection = 'home'
		}

		if (
			activeSection !== null &&
			activeSection.length > 0 && 
			activeSection !== props.activeSection
		  ) {
			props.setActiveSection(theActiveSection(activeSections))
		  }
	  
		  if (props.currentPage === 'home' && window.scrollY <= 300) {
			props.setActiveSection('home')
		  }
	}

	return (
		<ul className={`${props.menuState ? 'active-menu' : ''}`}>
			{
			menu.map((navItem)=> (
			// <li key={navItem.name} className={navItem.class}>
			<li key={navItem.name} className={ navItem.class }>
				<Link 
				className={(props.activeSection === navItem.class ? 'active' : '')}
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
	activeSection: state.app.activeSection,
	currentPage: state.app.currentPage,
	menuState: state.app.menuState
})
  
export default connect(mapStateToProps, { setActiveSection, setMenu })(NavItems)