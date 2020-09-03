import { types } from "../constants/types";
const initialState = {
  menuState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MENU:
      return { 
        ...state, 
        menuState: !action.payload 
      }
      
    default:
      return {
        ...state
      }
  }
};