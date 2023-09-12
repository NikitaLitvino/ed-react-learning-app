import { Dispatch, FC } from 'react'
import { Row, Col, Card, Button, Tag } from 'antd'
import styled from 'styled-components'
import { StyledText } from '../common/StyledComponents'
import { Form, Formik } from 'formik'
import { SelectField } from '../forms/SelectField'
import { useReferences } from '../../hooks/useReferences'
import { SPECIALIZATION_LIST } from '../../constants'
import { useDispatch } from 'react-redux'

const StyledButton = styled(Button)`
  height: 40px;
`

const StyledCard = styled(Card)`
  width: 270px;
  min-height: 270px;
  margin-bottom: 10px;
`

export const FiltersCard: FC = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const { technologies } = useReferences()

  return (
    <StyledCard
      headStyle={{ padding: '0 16px' }}
      bodyStyle={{ padding: '10px 16px 16px' }}
      title={<StyledText>Фильтры</StyledText>}
    >
      <Row justify="start" gutter={[0, 10]}>
        <Formik
          initialValues={{
            specialization: '',
            technologies: [],
          }}
          onSubmit={(values) => {
            dispatch({ type: 'SET_FILTER', filter: values })
          }}
        >
          {({ resetForm }) => (
            <Form style={{ width: '100%' }}>
              <SelectField
                $marginBottom={10}
                name="specialization"
                options={SPECIALIZATION_LIST ?? []}
                label={<StyledText>Направление</StyledText>}
              />

              <SelectField
                $marginBottom={19}
                name="technologies"
                options={technologies ?? []}
                label={<StyledText>Технологии</StyledText>}
                mode="multiple"
                allowClear
                shouldUpdate={{ shouldUpdate: () => true }}
                tagRender={({ label, onClose }) => (
                  <Tag closable onClose={onClose} color="green">
                    {label}
                  </Tag>
                )}
              />

              <Row justify="space-between">
                <Col xs={12}>
                  <StyledButton
                    type="ghost"
                    onClick={() =>{
                      resetForm({
                        values: {
                          specialization: '',
                          technologies: [],
                        }, 
                      })
                      dispatch({ type: 'SET_FILTER', filter: {specialization: '',
                      technologies: '',} })}
                    }
                  >
                    Сбросить
                  </StyledButton>
                </Col>
                <Col flex="0" xs={12}>
                  <StyledButton type="primary" htmlType="submit">
                    Применить
                  </StyledButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Row>
    </StyledCard>
  )
}
