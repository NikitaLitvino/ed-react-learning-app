import { useHistory, useLocation } from 'react-router-dom'
import { Row, Tabs, Col, Typography } from 'antd'
import { Layout } from '../components/Layout'
import { SignIn } from '../components/onboarding/SignIn'
import { SignUp } from '../components/onboarding/SignUp'

const { TabPane } = Tabs
const { Title, Text } = Typography

export enum TabKeys {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

export const Authorization = () => {
  const history = useHistory()
  const location = useLocation()
  
  let searchParams = new URLSearchParams(location.search)
  const activeTabKey = searchParams.get('tab')
  return (
    <Layout shouldBeCentered={true}>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col>
          <Title style={{ marginBottom: 12, textAlign: 'center' }}>
            Exceed Challenger
          </Title>

          <Col
            style={{
              marginBottom: '26px',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <Text type="secondary">
              Пожалуйста, выполните вход или регистрацию в системе
            </Text>
          </Col>

          <Tabs
            onChange={(key) =>
              history.push({
                pathname: location.pathname,
                search: `?tab=${key}`,
              })
            }
            activeKey={activeTabKey ? String(activeTabKey) : TabKeys.SignIn}
          >
            <TabPane key={TabKeys.SignIn} tab="Вход">
              <SignIn />
            </TabPane>

            <TabPane key={TabKeys.SignUp} tab="Регистрация">
              <SignUp />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  )
}
