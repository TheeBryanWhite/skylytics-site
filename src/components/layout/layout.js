import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

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

export default Layout
