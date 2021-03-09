import React from 'preact'
import { useStaticQuery, graphql } from "gatsby"
import { Link } from 'gatsby'
import { css } from "@emotion/react"

const L2Nav = props => {
	const subNavData = useStaticQuery(graphql`
		query SubNavQuery {
			allPrismicMenu {
				nodes {
					data {
						menu_items {
							child_menu {
								id
							}
							classes
							label
							link
						}
					}
					prismicId
				}
			}
		}
    `)

	const theMenu = subNavData.allPrismicMenu.nodes.filter(node => {
		if (props.childMenu !== node.prismicId) {
			return false
		}
		return true
	}).map(node => { return node })

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
				theMenu[0].data.menu_items.map(child => {
					return(
						<li 
							className={`l2-child ${child.classes}`}
							css={css`
								transition: background-color 0.2s linear;
								width: 100%;
							
								&:hover {
									background-color: rgba(11, 211, 205, 0.6);
								}
							`}
							key={child.label}>
							<Link 
								css={css`
									cursor: pointer !important;
									display: inline-block;
									padding-bottom: 15px;
									padding-top: 15px;
									width: 100%;
								
									&:hover:after {
										content: none;
									}
								`} 
								to={child.link}
							>
								<span>{child.label}</span>
							</Link>
						</li>
					)
				})
			}
		</ul>
	)
}
  
export default L2Nav