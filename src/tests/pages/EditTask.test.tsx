import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditTask } from '../../pages/EditTask'
import configureStore from 'redux-mock-store' //ES6 modules
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

const middlewares: any = []
const mockStore = configureStore(middlewares)

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')

  return {
    ...originalModule,
    Link: () => <div />,
    useLocation: () => ({
      location: {
        search: 'search',
        pathname: 'pathname',
      },
    }),
    useParams: () => ({
      taskId: '1ffgj23dfaf234fg3',
    }),
  }
})

jest.mock('../../hooks/useQueryRequest', () => ({
  useQueryRequest: () => ({
    isLoading: false,
    data: {
      attachments: [{ id: 36, url: 'https://docs.google.com/document' }],
      description: 'Описание тестового задания',
      id: 23,
      specialization: {
        id: 1,
        title: 'frontend',
      },
      technologies: [
        {
          id: 123,
          title: 'react',
        },
      ],
      title: 'Название тестового задания',
    },
  }),
}))

jest.mock('../../hooks/useReferences', () => ({
  useReferences: () => ({
    technologies: [
      {
        id: 123,
        title: 'adaptive',
      },
    ],
    specialization: [
      {
        id: 1,
        title: 'frontend',
      },
    ],
  }),
}))

jest.mock('../../hooks/useUser', () => ({
  useUser: () => ({
    email: 'string',
    first_name: 'string',
    id: 213,
    is_admin: false,
    last_name: 'string',
    completed_tasks: [],
    active_tasks: [],
  }),
}))

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    onLogout: () => {},
    onLogin: () => {},
  }),
}))

describe('EditTask', () => {
  const initialState = {
    tasks: [
      {
        attachments: 'https://docs.google.com/document',
        description: 'Описание тестового задания',
        id: 23,
        specialization: 'frontend',
        technologies: 'react',
        title: 'Название тестового задания',
      },
    ],
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

  test('EditTask', async () => {
    const { container } = render(
      <Provider store={store}>
        {' '}
        <EditTask />
      </Provider>,
    )
    expect(container).toBeTruthy()
  })
})
