import { types } from "../constants/types";
const initialState = {
  heroSlide: 0,
  menuState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MENU:
      return { 
        ...state, 
        menuState: !action.payload 
      }

    case types.SET_HERO_SLIDE:
      return { 
        ...state, 
        heroSlide: action.payload 
      }
      
    default:
      return {
        ...state
      }
  }
};