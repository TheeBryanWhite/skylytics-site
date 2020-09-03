import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Header from "../header/header";
import Footer from "../footer/footer";
import "./layout.scss";
import "../../utils/normalize.css";

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <body className={`${props.menuState ? 'locked' : ''}`} />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>
        {props.children}
      </main>
      <Footer siteTitle={data.site.siteMetadata.title} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string
}

Layout.defaultProps = {
  siteTitle: ``
}

const mapStateToProps = state => ({
  menuState: state.app.menuState
})

export default connect(mapStateToProps, null)(Layout)
