import React from 'preact'
import { Link } from 'gatsby'
import { css } from "@emotion/react"

const listItem = css`
	transition: background-color 0.2s linear;
	width: 100%;

	&:hover {
		background-color: rgba(11, 211, 205, 0.6);
	}
`

const navLink = css`
	display: inline-block;
	padding-bottom: 15px;
	padding-top: 15px;
	width: 100%;

	&:hover:after {
		content: none;
	}
`

const L2Nav = props => {
	if (props.navData.children) {
		return(
			<ul css={
					css`
						box-shadow: none;
						height: auto;
						max-height: 0;
						overflow: hidden;
						padding: 0;
						position: static;
						transition: max-height 1s linear;
						@media (min-width: 1024px) {
							background-color: #000;
							position: absolute; 
							top: 36px; 
							width: 200px;
						}
					`
				} 
				className="l2-children"
			>
				{
					props.navData.children.map(child => {
						return(
							<li 
								className={`l2-child ${child.class}`}
								css={listItem}
								key={child.name}>
								<Link 
									css={navLink} 
									to={child.link}
								>
									<span>{child.name}</span>
								</Link>
							</li>
						)
					})
				}
			</ul>
		)
	} else {
		return false
	}
}
  
export default L2Nav