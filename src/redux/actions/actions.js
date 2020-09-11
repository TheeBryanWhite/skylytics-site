import { types } from "../constants/types";

export const setMenu = (data) => (dispatch) => {
      dispatch({
        type: types.SET_MENU,
        payload: data,
      });
};

export const setHeroSlide = (data) => (dispatch) => {
  dispatch({
    type: types.SET_HERO_SLIDE,
    payload: data,
  });
};

export const setActiveSection = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_SECTION,
    payload: data,
  });
};

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

export const setActiveStory = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_STORY,
    payload: data
  })
}