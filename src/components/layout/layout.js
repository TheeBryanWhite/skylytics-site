import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { 
  setActiveSection, 
  setCurrentPage 
} from "../../redux/actions/actions"
import debounce from 'lodash.debounce'

import Header from '../header/header'
import Footer from '../footer/footer'
import './layout.scss'
import '../../utils/normalize.css'

class Layout extends Component {
  constructor(props) {
    super(props)

    if (typeof window !== "undefined") {
      require("smooth-scroll")('a[href*="#"]', {
        offset: (anchor) => {
          switch(anchor.getAttribute('id')) {
            case 'case-stories':
              return 150;

            case 'leadership':
              return 100;

              case 'contact-us':
                return -100;

            default:
              return 0;
          }
        }
      })
    }

    this.children = props.children
    this.findActiveSection = this.findActiveSection.bind(this)
    this.getSections = this.getSections.bind(this)
    this.getSectionLocs = this.getSectionLocs.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
  }

  componentDidMount = () => {
    if (this.props.currentPage === 'home') {
      this.scrollHandler()
    }
    this.props.setCurrentPage(this.props.page)
  }

  findActiveSection = () => {
    const currPositions = this.getSectionLocs().map(section => {
      if (section.position >= 0 && section.position <= 500) {
        this.props.setActiveSection(section.id)
      }

      return false
    })

    return currPositions
  }

  getSectionLocs = () => {
    const sections = this.getSections()
    const sectionArray = Array.prototype.slice.call(sections)
    
    const sectionData = sectionArray.map(section => {
      return {
        'id': section.getAttribute('id'),
        'position': section.getBoundingClientRect().top
      }
    })
    
    return sectionData
  }

  getSections = () => {
    return document.getElementsByTagName('section')
  }

  scrollHandler = () => {
      window.addEventListener('scroll', debounce(() => {
        this.findActiveSection()
      }, 500))
  }

  render() {
    return (
      <>
        <Helmet>
          <html className={`${this.props.menuState || this.props.mobileCase ? 'locked' : ''}`} lang="en" />
          <body className={`page-${this.props.currentPage}`} />
        </Helmet>
        <Header />
        <main>
          {this.children}
        </main>
        <Footer />
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string
}

Layout.defaultProps = {
  siteTitle: ``
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveSection: (param) => dispatch(setActiveSection(param)),
    setCurrentPage: (param) => dispatch(setCurrentPage(param))
  }
}

const mapStateToProps = state => ({
  activeSection: state.app.activeSection,
  currentPage: state.app.currentPage,
  menuState: state.app.menuState,
  mobileCase: state.app.mobileCaseState
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
