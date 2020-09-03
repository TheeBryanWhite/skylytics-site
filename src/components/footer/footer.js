import PropTypes from "prop-types"
import React from "react"
import SuperFooter from './super-footer'
import FooterLinks from './FooterLinks'
import Subfooter from './subfooter'

import "./footer.scss"

const Footer = ({ siteTitle, footerClass }) => (
    <footer className={footerClass}>
      <SuperFooter />
      <FooterLinks />
      <Subfooter />
    </footer>
  )
  
  Footer.propTypes = {
    footerClass: PropTypes.string,
    siteTitle: PropTypes.string
  }
  
  Footer.defaultProps = {
    footerClass: ``,
    siteTitle: ``
  }
  
  export default Footer