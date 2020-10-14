import React, { useCallback, useEffect } from 'react'
import { connect } from "react-redux"
import { 
	setActiveSolution,
	setActiveSubtab,
	setListOpenClose
} from "../../redux/actions/actions"

const SelectList = props => {
	const theList = React.createRef()
	const theSelected = React.createRef()

	const listOpenClose = () => {
		props.setListOpenClose(props.solutionsSubList)
	}

	const setDefaults = useCallback(() => {
		const theLabel = theSelected.current
		const theDefault = theLabel.nextElementSibling.querySelector('.active-subtab')
		theLabel.innerHTML = theDefault.innerHTML
	}, [theSelected])

	const setLabel = (label, target) => {
		const labelToSet = theSelected.current
		
		labelToSet.innerHTML = label
	}

	const subtabClickHandler = (index, event, label) => {
		event.preventDefault()
		props.setActiveSubtab(index)
		setLabel(label, event.currentTarget)
		listOpenClose()
	}

	useEffect(() => {
		setDefaults()
	}, [setDefaults])

	return(
		<div className={(props.solutionsSubList ? 'subtabs open' : 'subtabs')}>
			<div 
				className="selected-item"
				onClick={() => {listOpenClose()}}
				onKeyDown={() => {listOpenClose()}}
				ref={theSelected}
				role="list"
			></div>
			<ul ref={theList}>
			{props.listProps.node.items.map((node, index) => (
				<li 
					className={(props.activeSubtab === index ? 'subtab active-subtab' : 'subtab')}
					id={`solution-subtab-${index}`} 
					key={index}
				>
						<button onClick={ event => { subtabClickHandler(index, event, node.subtab_label.text) }}>
							{node.subtab_label.text}
						</button>
				</li>
			))}
			</ul>
		</div>
	)
}

const mapStateToProps = state => ({
	activeSolution: state.app.activeSolution,
	activeSubtab: state.app.activeSubtab,
	solutionsSubList: state.app.solutionsSubList
})

export default connect(mapStateToProps,
					  { 
						  setActiveSolution, 
						  setActiveSubtab,
						  setListOpenClose
					  })
					  (SelectList)