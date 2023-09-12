import { LeftOutlined, LinkOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Tag } from 'antd'
import { FieldArray, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { SPECIALIZATION_LIST } from '../../constants'
import { TaskSchema } from '../../forms/validators'
import { useReferences } from '../../hooks/useReferences'

import { InputField } from '../forms/InputField'
import { MultipleSelectField } from '../forms/MultipleSelectField'
import { SelectField } from '../forms/SelectField'
import { TextareaField } from '../forms/TextareaField'
import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const CloseIcon = styled(CloseOutlined)`
  svg {
    width: 10px;
    color: #767676;
    margin-left: 4px;
  }
`

export interface TaskFormProps {
  initialValues: any
  handleSubmit: (values: any) => void
  submitButtonText: string
  isEdit?: boolean
}

export const TaskForm: FC<TaskFormProps> = ({
  initialValues,
  handleSubmit,
  submitButtonText,
  isEdit,
}) => {
  const history = useHistory()
  const [inputValue, setInputValue] = useState<string>('')
  const { technologies } = useReferences()

  return (
    <Card
      bodyStyle={{ padding: '16px 32px 32px' }}
      headStyle={{ padding: '16px 32px 0px' }}
      title={isEdit ? 'Редактирование задания' : 'Добавление нового задания'}
      extra={
        <Button
          type="primary"
          ghost
          onClick={() => {
            history.goBack()
          }}
        >
          <LeftOutlined /> Назад
        </Button>
      }
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={TaskSchema}
      >
        {({ isValid, values, dirty, setValues }) => (
          <Form>
            <InputField
              label="Название задания"
              name="title"
              placeholder="Введите название"
              $marginBottom={19}
            />

            <Row gutter={[8, 0]}>
              <Col span={12}>
                <SelectField
                  placeholder="Выберите направление"
                  $marginBottom={19}
                  label="Направление"
                  name="specialization"
                  options={SPECIALIZATION_LIST}
                  shouldUpdate={{ shouldUpdate: () => true }}
                />
              </Col>

              <Col span={12}>
                <MultipleSelectField
                  placeholder="Выберите стек технологий"
                  $marginBottom={19}
                  label="Технологии"
                  name="technologies"
                  options={technologies ?? []}
                  shouldUpdate={{ shouldUpdate: () => true }}
                />
              </Col>
            </Row>

            <TextareaField
              label="Текст задания"
              name="description"
              placeholder="Введите текст"
              $marginBottom={19}
            />

            <FieldArray
              name="attachments"
              render={(arrayHelpers) => (
                <>
                  <Row gutter={[8, 0]} style={{ marginBottom: 19 }}>
                    <Col span={18}>
                      <Input
                        placeholder="https://github/myproject/example.git"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </Col>

                    <Col span={6}>
                      <Button
                        onClick={() => {
                          if (inputValue) {
                            arrayHelpers.push(inputValue)
                            setInputValue('')
                          }
                        }}
                        icon={<LinkOutlined />}
                        type="primary"
                        ghost
                        block
                      >
                        Добавить
                      </Button>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '16px', overflow: 'hidden' }}>
                    <Tag
                      key={values.attachments}
                      color="processing"
                      style={{ margin: '3px 6px 3px 0' }}
                    >
                      {values.attachments}
                      <CloseIcon
                        onClick={() =>
                          setValues({
                            ...values,
                            attachments: values.attachments.filter(
                              (attachment: string) =>
                                attachment !== values.attachments,
                            ),
                          })
                        }
                      />
                    </Tag>
                  </Row>
                </>
              )}
            />

            <Row justify="end">
              <Button
                htmlType="submit"
                style={{ height: 40 }}
                type="primary"
                disabled={!isValid || !dirty}
              >
                {isEdit && <SaveOutlined />}
                {submitButtonText}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  )
}
