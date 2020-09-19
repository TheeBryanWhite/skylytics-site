import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'gatsby'
import LazyLoad from 'react-lazyload'
import BackgroundImage from 'gatsby-background-image'
import LeadershipImages from './images'
import {setCurrentPage} from '../../redux/actions/actions'

import './leadership.scss'

const Leadership = props => {

	const clickHandler = () => {
		props.setCurrentPage('leadership')
	}

	return (
		<section className="leadership-team" id="leadership">
			<LazyLoad height={200}>
				<BackgroundImage
					className="bgnull"
					fluid={props.leadershipMeta.background_image.localFile.childImageSharp.fluid}
					Tag="div"
				></BackgroundImage>
				<div className="leadership-copy">
					<div className="container">
					<div dangerouslySetInnerHTML={{ __html: props.leadershipMeta.leadership_section_header.html }} />
						<LeadershipImages leadershipImageData={props.leadershipBody} />
						<p><Link
							className="cta"
							onClick={() => {clickHandler()}}
							to="/leadership">Leadership Team Members</Link></p>
					</div>
				</div>
			</LazyLoad>
		</section>
	)
}

const mapStateToProps = state => ({ currentPage: state.app.currentPage })
  
export default connect(
	mapStateToProps,
	{ 
	  setCurrentPage
	})(Leadership)