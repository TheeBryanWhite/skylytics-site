import React from "react"
import { connect } from "react-redux"
import { setMenu } from "../../redux/actions/actions"

import './hamburger.scss';

const Hamburger = (props) => {
	return (
		<div className={`hamburger ${props.menuState ? 'active-button' : ''}`}>
        	<button
		  		onClick={() => props.setMenu(props.menuState)}
			>
            	<i><span>Click here to open mobile nav</span></i>
        	</button>
        </div>
	)
}

const mapStateToProps = state => ({
    menuState: state.app.menuState
})

export default connect(mapStateToProps, { setMenu })(Hamburger)