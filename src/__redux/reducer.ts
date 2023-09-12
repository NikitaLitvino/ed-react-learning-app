import * as actionTypes from './actionTypes'
import { ITask, ITechnology, IAttachment, taskAction } from '../types'

let tech: ITechnology = {
  id: 1,
  title: 'tech',
}

let attach: IAttachment = {
  id: 1,
  url: 'attach.com',
}

let task: ITask = {
  id: '1231dsqw',
  title:
    '1234567890 1234567890 1234567890 12345678 123456789 123456789 123456789 1234567898',
  description: '1231233131313131231231312313312',
  specialization: 'backend',
  technologies: tech.title,
  attachments: attach.url,
}

let task2: ITask = {
  id: '125234gh',
  title: 'not to Do',
  description: 'Dont something',
  specialization: 'fullstack',
  technologies: tech.title,
  attachments: attach.url,
}

const initialState: ITask[] = [task, task2]

const reducer = (
  state: ITask[] = initialState,
  action: taskAction,
): ITask[] => {
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      return state.concat(action.task)
    }
    case actionTypes.CHANGE_TASK: {
      const newState = state.map((task) => {
        if (task.id === action.task.id) {
          task = action.task
        }
        return task
      })
      return newState
    }
    case actionTypes.DELETE_TASK: {
      return state.filter((element) => {
        return element.id !== task.id
      })
    }

    default:
      return state
  }
}

export default reducer
