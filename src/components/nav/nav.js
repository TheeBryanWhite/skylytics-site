import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
  setSelectorPosition,
  setSelectorWidth
} from "../../redux/actions/actions"
import debounce from 'lodash.debounce'

import Hamburger from './hamburger'
import NavItems from './nav-items'
import './nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.holdUpHey = this.holdUpHey.bind(this)
    this.getActiveLinkPosition = this.getActiveLinkPosition.bind(this)
    this.getActiveLinkWidth = this.getActiveLinkWidth.bind(this)
    this.getLinksLocs = this.getLinksLocs.bind(this)
    this.getNavLinks = this.getNavLinks.bind(this)
    this.resizeListener = this.resizeListener.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
  }

  componentDidMount() {
    this.props.setSelectorPosition(this.getActiveLinkPosition(this.getLinksLocs()))
    this.props.setSelectorWidth(this.getActiveLinkWidth(this.getLinksLocs()))
    this.holdUpHey()
    this.resizeListener()
  }

  holdUpHey = () => {
    const currentPagePromise = new Promise((resolve) => {
      if (this.props.currentPage !== null) {
        resolve('nice')
      }
    })

    currentPagePromise.then((result) => {
      if (this.props.currentPage === 'home') {
        this.scrollHandler()
      }
    })

    return false
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

  resizeListener = () => {
    window.addEventListener("resize", debounce(() => {
      this.props.setSelectorPosition(this.getActiveLinkPosition(this.getLinksLocs()))
      this.props.setSelectorWidth(this.getActiveLinkWidth(this.getLinksLocs()))
    }, 500))
  }

  scrollHandler = () => {
    window.addEventListener('scroll', debounce(() => {
      this.props.setSelectorPosition(this.getActiveLinkPosition(this.getLinksLocs()))
      this.props.setSelectorWidth(this.getActiveLinkWidth(this.getLinksLocs()))
    }, 500))
  }

  render() {
    return (
      <nav>
        <div className="container">
          <NavItems />
          <div 
            className={(this.props.currentPage === 'home' ? 'link-selector visible' : 'link-selector')} 
            style={{left: this.props.selectorPosition + 16, width: this.props.selectorWidth - 30}}
          >&nbsp;</div>
          <Hamburger />
        </div>
      </nav>
    ) 
  }
}

const mapStateToProps = state => ({
  activeSection: state.app.activeSection,
  currentPage: state.app.currentPage,
  selectorPosition: state.app.selectorPosition,
  selectorWidth: state.app.selectorWidth
})

export default connect(
                mapStateToProps,
                { 
                  setSelectorPosition,
                  setSelectorWidth 
                })(Nav)