import React from 'preact'
import { StaticQuery, graphql } from 'gatsby'


const VariableForm = props => {
	return (
		<StaticQuery
			query={graphql`
				query diffOptionsQuery {
					allPrismicFormBuilder {
						nodes {
							prismicId
							data {
								body {
									... on PrismicFormBuilderBodyText {
										id
										slice_type
										primary {
											required
											label
											validation_text
										}
									}
									... on PrismicFormBuilderBodyEmail {
										id
										slice_type
										primary {
											label
											required
											validation_text
										}
									}
									... on PrismicFormBuilderBodyPhone {
										id
										slice_type
										primary {
											label
											required
											validation_text
										}
									}
									... on PrismicFormBuilderBodyTextArea {
										id
										slice_type
										primary {
											label
											required
											validation_text
										}
									}
								}
							}
						}
					}
				}				  
			`}
			render={data => {
				const theForm = data.allPrismicFormBuilder.nodes.map(node => {
					if (props.formId === node.prismicId) {
						return node
					}
				})

				const handleSubmit = () => {
					console.log('send!')
				}
				return (
					<form onSubmit={handleSubmit}>
						<SliceZone allSlices={theForm[0].data.body} />
						<div className="row">
							<label htmlFor="postnobills">postnobills</label>
							<input
								className="postnobills"
								id="postnobills"
								name="postnobills"
								placeholder="postnobills"
								type="text"
							/>
						</div>
					</form>
				)
			}}
		/>
	)
}

export default VariableForm