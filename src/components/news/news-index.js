import React, {Component} from 'react'
import BackgroundImage from 'gatsby-background-image'
import {Link} from 'gatsby'

import './news-index.scss'

class NewsIndex extends Component {
	render() {
		return(
			<section className="news-index" id="news-index">
				<div className="news-articles container">
				{this.props.pageBody.map(article => (
					<article key={article.id} className="news-article" id={article.id}>
						<BackgroundImage
							className="flex-item article-thumb"
							fluid={article.data.news_hero_image.fluid}
							Tag="div"
						>
							<div className="article-type">
								<p>{article.data.news_category}</p>
							</div>
						</BackgroundImage>
						<div className="article-meta flex-item">
							<h3><Link to={`/${article.uid}`}>{article.data.news_title.text}</Link></h3>
							<p>{article.data.news_excerpt.text}</p>
							<p className="article-date">{article.last_publication_date}</p>
						</div>
					</article>
				))}
				</div>
			</section>
		)
	}
}

export default NewsIndex