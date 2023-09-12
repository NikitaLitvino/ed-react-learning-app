import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { NewTask } from '../../pages/NewTask'
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

describe('NewTask', () => {
  const store = mockStore()
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

  test('NewTask', async () => {
    const { container } = render(
      <Provider store={store}>
        {' '}
        <NewTask />
      </Provider>,
    )
    expect(container).toBeTruthy()

    userEvent.type(
      screen.getByPlaceholderText('Введите название'),
      'Hello todo',
    )

    userEvent.type(screen.getByPlaceholderText('Введите текст'), 'Description')

    const specSelect = screen.getAllByRole('combobox')[0]
    act(() => {
      userEvent.click(specSelect)
    })
    await waitFor(() => screen.getByText('Frontend'))
    act(() => {
      fireEvent.click(screen.getByText('Frontend'))
    })
    const techSelect = screen.getAllByRole('combobox')[1]
    act(() => {
      userEvent.click(techSelect)
    })
    await waitFor(() => screen.getAllByText('adaptive')[1])
    act(() => {
      fireEvent.click(screen.getAllByText('adaptive')[1])
    })
    act(() => {
      userEvent.click(screen.getAllByText('Добавить')[1])
    })
    expect(
      screen.getByPlaceholderText('Введите название').getAttribute('value'),
    ).toBe('Hello todo')
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getAllByText('Frontend')[0]).toBeInTheDocument()
    expect(screen.getAllByText('adaptive')[0]).toBeInTheDocument()
  })
})
