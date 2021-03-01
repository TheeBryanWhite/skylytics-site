import React from 'preact'
import { css } from "@emotion/react"

const SubNavTrigger = props => {

	let clickHandler = event => {
		event.preventDefault();	
		console.log(props.clickStatus)
		props.changeHandler(!props.clickStatus)
		console.log(props.clickStatus)
	}

	return(
		<div className="trigger" >
			<button
				css={
					css`
						background-color: transparent;
						border: 0;
						height: 20px;
						outline: none;
						position: absolute;
						right: 20px;
						top: 0;
						transition: transform 0.3s linear;
						width: 20px;
						z-index: 100;

						&:before,
						&:after {
							background-color: #0510a0;
							content: '';
							display: block;
							height: 4px;
							position: absolute;
							top: 50%;
							width: 20px;
						}

						&:after {
							transform: rotate(90deg);
						}

						&.active {
							transform: rotate(-45deg) translate(-5px, 5px);
						}

						@media (min-width: 1024px) {
							display: none;
						}
					`
				}
				onClick={clickHandler}
			>
				<span 
					css={
						css`
							clip: rect(0 0 0 0); 
							clip-path: inset(50%);
							height: 1px;
							overflow: hidden;
							position: absolute;
							right: 0;
							white-space: nowrap; 
							width: 1px;
						`
					}
				>
					Open/Close
				</span>
			</button>
		</div>
	)
}

export default SubNavTrigger