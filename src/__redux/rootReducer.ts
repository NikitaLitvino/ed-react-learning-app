import reducer from './reducer'
import filterReducer from './filterReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  tasks: reducer,
  filter: filterReducer,
})
