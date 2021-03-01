import React, {Component} from 'react'
import { connect } from "react-redux"
import { 
  setSelectorPosition,
  setSelectorWidth
} from "../../redux/actions/actions"

import Hamburger from './hamburger'
import NavItems from './nav-items'
import './nav.scss'

class Nav extends Component {
    constructor(props) {
      super(props)
  
      this.getActiveLinkPosition = this.getActiveLinkPosition.bind(this)
      this.getActiveLinkWidth = this.getActiveLinkWidth.bind(this)
      this.getLinksLocs = this.getLinksLocs.bind(this)
      this.getNavLinks = this.getNavLinks.bind(this)
      this.scrollHandler = this.scrollHandler.bind(this)
    }

  componentDidMount() {
    setTimeout(() => {
      this.props.setSelectorPosition(this.getActiveLinkPosition(this.getLinksLocs()))
      this.props.setSelectorWidth(this.getActiveLinkWidth(this.getLinksLocs()))
    }, 500)
    this.scrollHandler();
  }

  getActiveLinkPosition = linkObj => {
    let activeLinkPosition = null

    linkObj.forEach(link => {
      if (link.id === this.props.activeSection) {
        activeLinkPosition = link.position
      }
    })

    return activeLinkPosition
  }

  getActiveLinkWidth = linkObj => {
    let activeLinkWidth = 0

    linkObj.forEach(link => {
      if (link.id === this.props.activeSection) {
        activeLinkWidth = link.width
      }
    })

    return activeLinkWidth
  }

  getLinksLocs = () => {
    const links = this.getNavLinks()
    const linkArray = Array.prototype.slice.call(links)
    
    const linkData = linkArray.map(section => {
      return {
        'id': section.getAttribute('class'),
        'position': section.getBoundingClientRect().left,
        'width': section.offsetWidth
      }
    })
    
    return linkData
  }

  getNavLinks = () => {
    const navMenu = document.querySelectorAll('nav')
    const navLinks = navMenu[0].querySelectorAll('li')

    return navLinks
  }

  scrollHandler = () => {
    window.addEventListener('scroll', () => {
      this.props.setSelectorPosition(this.getActiveLinkPosition(this.getLinksLocs()))
      this.props.setSelectorWidth(this.getActiveLinkWidth(this.getLinksLocs()))
    })
  }

  render() {
    return (
      <nav>
        <div className="container">
          <NavItems />
          <div className="link-selector" style={{left: this.props.selectorPosition + 16, width: this.props.selectorWidth - 30}}>&nbsp;</div>
          <Hamburger />
        </div>
      </nav>
    ) 
  }
}

const mapStateToProps = state => ({
  selectorPosition: state.app.selectorPosition,
  selectorWidth: state.app.selectorWidth
})

export default connect(mapStateToProps, { setSelectorPosition, setSelectorWidth })(Nav)