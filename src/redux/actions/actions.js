import { types } from "../constants/types";

export const caseStoryCycle = (data) => (dispatch) => {
  dispatch({
    type: types.CASE_STORY_CYCLE,
    payload: data,
  })
}

export const setMenu = (data) => (dispatch) => {
  dispatch({
    type: types.SET_MENU,
    payload: data,
  })
}

export const setHeroSlide = (data) => (dispatch) => {
  dispatch({
    type: types.SET_HERO_SLIDE,
    payload: data,
  })
}

export const setActiveSection = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_SECTION,
    payload: data,
  })
}

export const setSelectorPosition = (data) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTOR_POSITION,
    payload: data
  })
}

export const setSelectorWidth = (data) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTOR_WIDTH,
    payload: data
  })
}

// selectedStory sets the user-chosen case story to be expanded and read
export const setSelectedStory = (data) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTED_STORY,
    payload: data,
  })
}

export const setExpandedStory = (data) => (dispatch) => {
  dispatch({
    type: types.SET_EXPANDED_STORY,
    payload: data
  })
}

// setActiveStory sets the story highlighted by the case story automatically by the cycle
export const setActiveStory = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_STORY,
    payload: data
  })
}

export const setActiveSolution = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_SOLUTION,
    payload: data
  })
}

export const setActiveSubtab = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_SUBTAB,
    payload: data
  })
}
