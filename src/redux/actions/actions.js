import { types } from "../constants/types";

export const setMenu = (data) => (dispatch) => {
      dispatch({
        type: types.SET_MENU,
        payload: data,
      });
};