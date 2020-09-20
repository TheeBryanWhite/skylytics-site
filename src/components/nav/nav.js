import React, {Component} from 'react'

import Hamburger from './hamburger'
import NavItems from './nav-items'
import './nav.scss'

class Nav extends Component {

  render() {
    return (
      <nav>
        <div className="container">
          <NavItems />
          <Hamburger />
        </div>
      </nav>
    ) 
  }
}

export default Nav