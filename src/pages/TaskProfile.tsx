import { Button, Card, Col, Divider, Popconfirm, Row, Tag } from 'antd'
import { Dispatch, FC } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Loader } from '../components/common/Loader'
import { Layout } from '../components/Layout'
import { StyledText,StyledTitile } from '../components/common/StyledComponents'
import { ITask } from '../types'
import { StatusButton } from '../components/task/StatusButton'
import ReactMarkdown from 'react-markdown'

import { AdminRequired } from '../hocs/AdminRequired'
import { DeleteOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

export const TaskProfile: FC = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useHistory()
 

  
  const tasks: ITask[] = useSelector((state: any) => state.tasks)

  const task = tasks.find((element)=>{return element.id=== taskId})
    
  const isLoading = false;
  

  const handleDeleteTask = (values:any) => {
    dispatch({type: "DELETE_TASK", task: values} )
    navigate.push('/dashboard')
  }

  return (
    <Layout>
      <Breadcrumbs
        items={[
          {
            key: 'currentTask',
            title: task?.title ?? '-',
            link: `/task/${taskId}`,
          },
        ]}
      />
      {isLoading && <Loader fullScreen />}

      {!isLoading && task && (
        <Row justify="center">
          <Col flex="0 1 970px">
            <Card
              headStyle={{ padding: '16px 32px 0', maxWidth: '970px' }}
              bodyStyle={{ padding: '16px 32px 32px', maxWidth: '970px' }}
              title={task.title}
              extra={
                <AdminRequired>
                  <Popconfirm
                    title="Вы уверены, что хотите удалить эту задачу?"
                    onConfirm={()=>handleDeleteTask(task)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button
                      type="primary"
                      danger
                      style={{ margin: '0 8px 0 20px' }}
                    >
                      <DeleteOutlined />
                      Удалить задание
                    </Button>
                  </Popconfirm>

                  <Button
                    type="primary"
                    ghost
                    onClick={() => navigate.push(`/task/${taskId}/edit`)}
                  >
                    <EditOutlined />
                    Изменить
                  </Button>
                </AdminRequired>
              }
            >
              <Row align="middle" style={{ marginBottom: 20 }}>
                <StyledTitile>{task.specialization}</StyledTitile>

                <Divider
                  type="vertical"
                  style={{ background: '#555555', height: '20px' }}
                />

                
                  <Tag key={task.technologies} color="green">
                    {task.technologies}
                  </Tag>
                
              </Row>

              <Row gutter={[0, 8]} style={{ marginBottom: 6 }}>
                <Col span={24}>
                  <StyledText >Описание задания</StyledText>
                </Col>

                <Col span={24} style={{ wordWrap: 'break-word' }}>
                  <ReactMarkdown>{task.description.length > 200 ? (task.description.slice(0,200,)+'...'):(task.description)}</ReactMarkdown>
                </Col>
              </Row>

              {task.attachments && (
                <Row style={{ overflow: 'hidden' }}>
                  
                    <Col
                      style={{ margin: '5px 0' }}
                      key={task.attachments}
                      span={24}
                    >
                      <a href={task.attachments} target="_blank">
                        {task.attachments}
                      </a>
                    </Col>
                  
                </Row>
              )}

              <Row style={{ marginTop: 20 }} justify="end">
                <Button
                  type="primary"
                  ghost
                  onClick={() => navigate.push('/dashboard')}
                  style={{ height: 40, marginRight: 20 }}
                >
                  <LeftOutlined />
                  Назад
                </Button>

                <StatusButton />
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  )
}
