import { types } from "../constants/types";

export const contactFormSubmit = (data) => (dispatch) => {
  dispatch({
    type: types.CONTACT_FORM_SUBMIT,
    payload: data,
  })
}

export const newsletterFormSubmit = (data) => (dispatch) => {
  dispatch({
    type: types.NEWSLETTER_FORM_SUBMIT,
    payload: data,
  })
}

export const setCaseStoryCycle = (data) => (dispatch) => {
  dispatch({
    type: types.CASE_STORY_CYCLE,
    payload: data,
  })
}

export const setHeroCycle = (data) => (dispatch) => {
  dispatch({
    type: types.HERO_CYCLE,
    payload: data,
  })
}

export const setListOpenClose = (data) => (dispatch) => {
  dispatch({
    type: types.SET_LIST_OPEN_CLOSE,
    payload: data,
  })
}

export const setMenu = (data) => (dispatch) => {
  dispatch({
    type: types.SET_MENU,
    payload: data,
  })
}

export const setMobileCaseState = (data) => (dispatch) => {
  dispatch({
    type: types.SET_MOBILE_CASE,
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

export const setCurrentPage = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_PAGE,
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
