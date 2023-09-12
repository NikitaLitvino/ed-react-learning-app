import { FC } from 'react'
import { Row, Col, Button } from 'antd'
import { FiltersCard } from '../components/dashboard/FiltersCard'
import { TasksCard } from '../components/dashboard/TasksCard'
import { TaskSearchForm } from '../components/dashboard/TaskSearchForm'
import { Layout } from '../components/Layout'

import { AdminRequired } from '../hocs/AdminRequired'
import { useHistory } from 'react-router-dom'

export const Dashboard: FC = () => {
  const navigate = useHistory();
  

  return (
    <Layout>
      <Row justify="center">
        <Col flex="1170px">
          <Row justify="space-between" wrap={false}>
            <Col md={9} lg={7} xl={6}>
              <FiltersCard />
            </Col>

            <Col style={{ paddingLeft: 10 }} md={15} lg={17} xl={18}>
              <Row style={{ marginBottom: 30 }} wrap={false}>
                <Col flex="auto">
                  <TaskSearchForm />
                </Col>

                <AdminRequired>
                  <Col flex="100px" style={{ padding: '0 0 0 8px' }}>
                    <Button
                      onClick={() => navigate.push('/new-task')}
                      size="large"
                      block
                    >
                      Создать
                    </Button>
                  </Col>
                </AdminRequired>
              </Row>

              <TasksCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}
