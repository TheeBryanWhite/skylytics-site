import React, {Component} from 'react'
import { connect } from 'react-redux'
import SuperHeader from './super-header/super-header'
import Nav from '../nav/nav'

import './header.scss'

class Header extends Component {
  render() {
    return(
      <header>
        <SuperHeader />
        <Nav activeSection={this.props.activeSection} />
      </header>
    )
  }
}

const mapStateToProps = state => ({
  activeSection: state.app.activeSection,
})

export default connect(mapStateToProps, null)(Header)