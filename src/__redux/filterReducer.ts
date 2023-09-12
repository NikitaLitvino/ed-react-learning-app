import * as actionTypes from './actionTypes'
import { IFilter, filterAction } from '../types'

const initialState: IFilter = {
  specialization: '',
  technologies: '',
}

const filterReducer = (
  state: IFilter = initialState,
  action: filterAction,
): IFilter => {
  switch (action.type) {
    case actionTypes.SET_FILTER: {
      return action.filter
    }
    default:
      return state
  }
}

export default filterReducer
