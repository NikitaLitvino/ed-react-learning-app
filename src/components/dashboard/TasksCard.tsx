import { FC, useState, useEffect } from 'react'
import { Row, Card, Spin } from 'antd'
import { StyledText } from '../common/StyledComponents'
import { TasksPagination } from './TasksPagination'
import { TaskItem } from './TaskItem'
import { useSelector } from 'react-redux'
import { IFilter, ITask } from '../../types'

export const TasksCard: FC = () => {
  const tasks: ITask[] = useSelector((state: any) => state.tasks)
  const filter: IFilter = useSelector((state: any) => state.filter)
  const [renderList, setRenderList] = useState<ITask[]>([])
  const isLoading = false
  useEffect(() => {
    if (filter.specialization !== '' && filter.technologies.length !== 0) {
      setRenderList(
        tasks.filter((element) => {
          return (
            element.specialization === filter.specialization &&
            element.technologies === filter.technologies
          )
        }),
      )
    } else if (filter.specialization !== '') {
      setRenderList(
        tasks.filter((element) => {
          return element.specialization === filter.specialization
        }),
      )
    } else if (filter.technologies.length !== 0) {
      setRenderList(
        tasks.filter((element) => {
          return element.technologies === filter.technologies
        }),
      )
    } else {
      setRenderList(tasks)
    }
  }, [filter])

  useEffect(() => {
    setRenderList(tasks)
  }, [])

  const data = { results: [renderList] }

  return (
    <Card bodyStyle={{ padding: 32 }} style={{ marginBottom: 20 }}>
      {isLoading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row justify="start">
          <StyledText style={{ marginBottom: 26, fontSize: 20 }}>
            {data?.results ? 'Последние добавленные' : 'Задачи не найдены'}
          </StyledText>
        </Row>
      )}

      {renderList && renderList.length > 0 ? (
        <>
          {renderList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}

          <Row justify="center">
            <TasksPagination steps={renderList.length / 10} />
          </Row>
        </>
      ) : (
        <StyledText>Нет задач</StyledText>
      )}
    </Card>
  )
}
