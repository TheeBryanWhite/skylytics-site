import React from 'react'
import SuperHeader from './super-header/super-header'
import Nav from '../nav/nav'

import './header.scss'

const Header = ({ siteTitle }) => (
  <header>
    <SuperHeader title={siteTitle} />
    <Nav />
  </header>
)

export default Header