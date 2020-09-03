import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { setMenu } from '../../redux/actions/actions'

import Hamburger from './hamburger'
import './nav.scss';

const Nav = (props) => {

  let menu = useStaticQuery(graphql`
    query SiteNavQuery {
      site {
        siteMetadata {
          menuLinks {
            class
            name
            link
          }
        }
      }
    }
  `);

  menu = menu.site.siteMetadata.menuLinks

  return (
    <nav>
      <div className="container">
        <ul className={`${props.menuState ? 'active-menu' : ''}`}>
        {
          menu.map((navItem)=> (
          <li key={navItem.name} className={navItem.class}>
            <Link 
              onClick={() => props.setMenu(props.menuState)}
              to={navItem.link}
            >
              <span>{navItem.name}</span>
            </Link>
          </li>
          ))
        }
        </ul>

        <Hamburger />
      </div>
    </nav>
  )
}

Nav.propTypes = {
    menu: PropTypes.string,
}
  
Nav.defaultProps = {
    menu: ``,
}

const mapStateToProps = state => ({
  menuState: state.app.menuState
})

export default connect(mapStateToProps, { setMenu })(Nav)