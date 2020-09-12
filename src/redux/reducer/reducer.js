import { types } from "../constants/types";
const initialState = {
  activeSection: "home",
  activeSolution: 0,
  activeSubtab: 0,
  activeStory: 0,
  caseStoryCycle: true,
  expandedStory: null,
  heroSlide: 0,
  menuState: false,
  selectedStory: null,
  selectorPosition: 0,
  selectorWidth: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CASE_STORY_CYCLE:
      return { 
        ...state, 
        caseStoryCycle: action.payload
      }

    case types.SET_SELECTED_STORY:
      return { 
        ...state, 
        selectedStory: action.payload
      }

    case types.SET_EXPANDED_STORY:
      return { 
        ...state, 
        expandedStory: action.payload
      }

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

    case types.SET_ACTIVE_SOLUTION:
      return { 
        ...state, 
        activeSolution: action.payload 
      }

    case types.SET_ACTIVE_SUBTAB:
      return { 
        ...state, 
        activeSubtab: action.payload 
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