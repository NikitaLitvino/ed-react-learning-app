import { FC } from 'react'
import { Row, Col, Divider, Tag } from 'antd'
import { StyledText } from '../common/StyledComponents'
import { ITask } from '../../types'
import { useHistory } from 'react-router-dom'

interface TaskItemProps {
  task: ITask
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const navigate = useHistory()

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        onClick={() => navigate.push(`/task/${task.id}`)}
        style={{ minHeight: 32, cursor: 'pointer', width: '100%' }}
      >
        <Col xs={17}>
          <StyledText style={{ padding: '0 20px 0 0' }}>
            {task.title.length > 30
              ? task.title.slice(0, 30) + '...'
              : task.title}
          </StyledText>
        </Col>

        <Col offset={1} xs={6}>
          <StyledText>{task.specialization}</StyledText>

          <Divider type="vertical" />

          <Tag key={task.technologies} color="green">
            {task.technologies}
          </Tag>
          {task.technologies.length > 1 && (
            <StyledText>+{task.technologies.length - 1}</StyledText>
          )}
        </Col>
      </Row>

      <Divider style={{ margin: '20px 0' }} />
    </>
  )
}
