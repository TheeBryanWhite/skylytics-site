import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../reducer"

const initialState = {}
const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true})
	)
)

export default ({ element }) => <Provider store={store}>{element}</Provider>