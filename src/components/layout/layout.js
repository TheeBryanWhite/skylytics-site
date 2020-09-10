import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setActiveSection } from "../../redux/actions/actions"

import Header from '../header/header'
import Footer from '../footer/footer'
import './layout.scss'
import '../../utils/normalize.css'

class Layout extends Component {
  constructor(props) {
    super(props)

    this.children = props.children
    this.findActiveSection = this.findActiveSection.bind(this)
    this.getSections = this.getSections.bind(this)
    this.getSectionLocs = this.getSectionLocs.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
  }

  findActiveSection() {
    const currPositions = this.getSectionLocs().map(section => {
      if (section.position >= 0 && section.position <= 500) {
        this.props.setActiveSection(section.id)
      }

      return false
    })

    return currPositions
  }

  getSectionLocs() {
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

  getSections() {
    return document.getElementsByTagName('section')
  }

  scrollHandler() {
    window.addEventListener('scroll', () => {
      this.findActiveSection()
    })
  }

  componentDidMount() {
    this.scrollHandler()
  }

  render() {
    return (
      <>
        <Helmet>
          <body className={`${this.props.menuState ? 'locked' : ''}`} />
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
    setActiveSection: (param) => dispatch(setActiveSection(param))
  }
}

const mapStateToProps = state => ({
  activeSection: state.app.activeSection,
  menuState: state.app.menuState
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
