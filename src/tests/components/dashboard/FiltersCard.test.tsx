import React from 'react'
import { render, screen } from '@testing-library/react'
import { FiltersCard } from '../../../components/dashboard/FiltersCard'
import configureStore from 'redux-mock-store' //ES6 modules
import { Provider } from 'react-redux'

const middlewares: any = []
const mockStore = configureStore(middlewares)

jest.mock('../../../hooks/useReferences', () => ({
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

jest.mock('react-query', () => {
  const originalModule = jest.requireActual('react-query')

  return {
    ...originalModule,
    useQueryClient: () => ({
      queryClient: {
        defaultOptions: {},
        mutationCache: {},
        mutationDefaults: [],
        queryCache: {},
        queryDefaults: [],
        unsubscribeFocus: () => {},
        unsubscribeOnline: () => {},
        setQueryData: (firstParam: string, data: any) => {
          return null
        },
      },
    }),
  }
})

describe('FiltersCard', () => {
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

  test('FiltersCard', () => {
    const { container } = render(
      <Provider store={store}>
        <FiltersCard />
      </Provider>,
    )
    expect(container).toBeTruthy()
    const checkTextRender = screen.getByText(/Фильтры/i)
    expect(checkTextRender).toBeInTheDocument()
  })
})
