import React from 'react'
import { render, screen } from '@testing-library/react'
import { TaskItem } from '../../../components/dashboard/TaskItem'
import configureStore from 'redux-mock-store'

describe('TaskItem', () => {
  beforeAll(() => {
    const initialState = {}
    const mockStore = configureStore()
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

  test('TaskItem', () => {
    const { container } = render(
      <TaskItem
        task={{
          attachments: 'https://docs.google.com/document/d',
          description: 'В макетах',
          id: '23',
          specialization: 'frontend',

          technologies: 'adaptive',

          title: 'Компонент выбора способа доставки',
        }}
      />,
    )
    expect(container).toBeTruthy()
    const checkTextRender = screen.getByText(
      /Компонент выбора способа доста.../i,
    )
    expect(checkTextRender).toBeInTheDocument()
  })
})
