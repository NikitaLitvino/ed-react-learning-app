import React from 'react'
import { render, screen } from '@testing-library/react'
import { TasksCard } from '../../../components/dashboard/TasksCard'
import configureStore from 'redux-mock-store' //ES6 modules
import { Provider } from 'react-redux'

const middlewares: any = []
const mockStore = configureStore(middlewares)

jest.mock('../../../hooks/useQueryRequest', () => ({
  useQueryRequest: () => ({
    isLoading: false,
    data: {
      count: 1,
      next: 2,
      previous: 3,
      results: [
        {
          attachments: [{ id: 36, url: 'https://docs.google.com/document' }],
          description: 'Описание тестового задания',
          id: 23,
          specialization: 'frontend',

          technologies: 'react',

          title: 'Название тестового задания',
        },
      ],
    },
  }),
}))

describe('TasksCard', () => {
  const initialState = {
    filter: {
      technologies: '',
      specialization: '',
    },
    tasks: {},
  }
  const store = mockStore(initialState)
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {},
        }
      },
    })
  })

  test('TasksCard', () => {
    const { container } = render(
      <Provider store={store}>
        {' '}
        <TasksCard />
      </Provider>,
    )
    expect(container).toBeTruthy()
  })
})
