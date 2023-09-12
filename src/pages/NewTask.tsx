import { Col, Row } from 'antd/lib/grid'
import { useHistory } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { TaskForm } from '../components/task/TaskForm'
import { ITask } from '../types'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { nanoid } from 'nanoid'

export const NewTask = () => {
  const navigate = useHistory()

  const dispatch: Dispatch<any> = useDispatch()
  const handleCreateTask = (values: any) => {
    const task: ITask = {
      id: nanoid(),
      title: values.title,
      description: values.description,
      specialization: values.specialization,
      attachments: values.attachments,
      technologies: values.technologies,
    }

    dispatch({ type: 'ADD_TASK', task: task })
    navigate.push('/dashboard')
  }

  return (
    <Layout>
      <Row justify="center">
        <Col flex="0 1 970px">
          <TaskForm
            initialValues={{
              title: '',
              specialization: '',
              description: '',
              technologies: [],
              attachments: [],
            }}
            handleSubmit={handleCreateTask}
            submitButtonText="Добавить"
          />
        </Col>
      </Row>
    </Layout>
  )
}
