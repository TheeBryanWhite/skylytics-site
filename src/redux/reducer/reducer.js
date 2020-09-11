import { types } from "../constants/types";
const initialState = {
  activeSection: "home",
  activeStory: 0,
  heroSlide: 0,
  menuState: false,
  selectorPosition: 0,
  selectorWidth: 0
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

    case types.SET_ACTIVE_SECTION:
      return { 
        ...state, 
        activeSection: action.payload 
      }

    case types.SET_SELECTOR_POSITION:
      return { 
        ...state, 
        selectorPosition: action.payload 
      }

    case types.SET_SELECTOR_WIDTH:
      return { 
        ...state, 
        selectorWidth: action.payload 
      }

    case types.SET_ACTIVE_STORY:
      return { 
        ...state, 
        activeStory: action.payload 
      }
      
    default:
      return {
        ...state
      }
  }
};