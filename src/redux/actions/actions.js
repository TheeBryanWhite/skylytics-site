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