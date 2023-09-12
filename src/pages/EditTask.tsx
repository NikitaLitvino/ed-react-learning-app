import { Col, Row } from 'antd/lib/grid'
import { useHistory, useParams } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { Layout } from '../components/Layout'
import { TaskForm } from '../components/task/TaskForm'

import { ITask } from '../types'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'react'

export const EditTask = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useHistory()

  const handleUpdateTask = (values: any) => {
    const task: ITask = {
      id: values.id,
      title: values.title,
      description: values.description,
      specialization: values.specialization,
      attachments: values.attachments,
      technologies: values.technologies,
    }
    dispatch({ type: 'CHANGE_TASK', task: task })
    navigate.push('/dashboard')
  }

  const tasks: ITask[] = useSelector((state: any) => state.tasks)

  const task = tasks.find((element) => {
    return element.id === taskId
  })

  const isLoading = false

  return (
    <Layout>
      <Row justify="center">
        <Col flex="0 1 970px">
          {isLoading && <Loader />}

          {!isLoading && task && (
            <TaskForm
              isEdit
              initialValues={{
                id: task.id,
                title: task.title,
                specialization: task.specialization,
                description: task.description,
                technologies: task.technologies,
                attachments: task.attachments,
              }}
              handleSubmit={handleUpdateTask}
              submitButtonText="Изменить"
            />
          )}
        </Col>
      </Row>
    </Layout>
  )
}
