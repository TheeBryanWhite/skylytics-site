import React from 'preact'
import PropTypes from 'prop-types'
import { css } from "@emotion/react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import scrollToElement from 'scroll-to-element'
import { setActiveSection, setMenu } from '../../redux/actions/actions'
import L2Nav from './l2Nav'
import window from 'global/window'

const NavItems = (props) => {
	let menu = useStaticQuery(graphql`
		query SiteNavQuery {
			site {
				siteMetadata {
					menuLinks {
						children {
							class
							link
							name
						}
						class
						name
						link
					}
				}
			}
		}
	`);

	menu = menu.site.siteMetadata.menuLinks
	  
	const clickHandler = (e, target) => {
		props.setMenu(props.menuState)
		if (typeof window !== 'undefined') {
			if (window.location.pathname === '/') {
				if (e) {
					scrollToElement(target)
				}
			}
		}
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

	  const subMenuHandler = event => {
		const clicked = event.currentTarget
		clicked.parentElement.parentElement.classList.toggle('open')
	  }

	  const SubNavCondition = props => {
		  if (props.hasChildren) {
			  return <div css={css`transition: transform 0.3s linear;`} className="trigger">
			  <button
				  css={
					  css`
						  background-color: transparent;
						  border: 0;
						  height: 20px;
						  outline: none;
						  position: absolute;
						  right: 20px;
						  top: 0;
						  transition: transform 0.3s linear;
						  width: 20px;
						  z-index: 100;
  
						  &:before,
						  &:after {
							  background-color: #0510a0;
							  content: '';
							  display: block;
							  height: 4px;
							  position: absolute;
							  top: 50%;
							  width: 20px;
						  }
  
						  &:after {
							  transform: rotate(90deg);
						  }
  
						  @media (min-width: 1024px) {
							  display: none;
						  }
					  `
				  }
				  onClick={subMenuHandler}
			  >
				  <span 
					  css={
						  css`
							  clip: rect(0 0 0 0); 
							  clip-path: inset(50%);
							  height: 1px;
							  overflow: hidden;
							  position: absolute;
							  right: 0;
							  white-space: nowrap; 
							  width: 1px;
						  `
					  }
				  >
					  Open/Close
				  </span>
			  </button>
		  </div>
		  }
		  
		  return false
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
			<li key={navItem.name} className={ (navItem.children ? `${navItem.class} has-children` : navItem.class) }>
				<Link
					className={(props.activeSection === navItem.class ? 'active' : '')}
					onClick={e => clickHandler(e, navItem.class)}
					to={navItem.link}
				>
				<span>{navItem.name}</span>
				</Link>
				<L2Nav navData={navItem} />
				<SubNavCondition hasChildren={navItem.children} />
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