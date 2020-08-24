import PropTypes from "prop-types"
import React from "react"

import "./nav.scss";

const Nav = ({ menu }) => {

  return (
    <nav>
        <ul>
        {
            menu.map((navItem)=> (
                
            ))
        }
        </ul>
    </nav>
  )
}

Nav.propTypes = {
    menu: PropTypes.array,
}
  
Nav.defaultProps = {
    menu: ``,
}

export default Nav;