import { Link, useHistory } from 'react-router-dom'
import { Row } from 'antd'
import { Formik, Form } from 'formik'
import { InputField } from '../forms/InputField'
import { StyledButton } from '../common/StyledComponents'
import { SingUpSchema } from '../../forms/validators'
import { objectKeysToSnakeCase } from '../../helpers'
import { useApi } from '../../hooks/useApi'
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '../../utils/systemNotification'
import { ERROR_NOTIFIFCATION_MESSAGE } from '../../constants'

export const SignUp = () => {
  const navigate = useHistory()

  const api = useApi()

  const registration = (registrationData: Record<string, any>) => {
    api
      .post('registration/', { ...registrationData })
      .then(({ data }) => {
        if (data) {
          sendSuccessNotification('Вы успешно зарегистрировались!')
          navigate.push('/auth')
        }
      })
      .catch(() => {
        sendErrorNotification(ERROR_NOTIFIFCATION_MESSAGE)
      })
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmed: '',
      }}
      onSubmit={(values) => registration(objectKeysToSnakeCase(values))}
      validationSchema={SingUpSchema}
    >
      {({ isValid }) => (
        <Form>
          <div style={{ display: 'flex' }}>
            <InputField
              $marginRight={5}
              name="firstName"
              placeholder="Введите Имя"
            />
            <InputField name="lastName" placeholder="Введите Фамилию" />{' '}
          </div>

          <InputField name="email" placeholder="Введите Email" />
          <InputField name="password" placeholder="Введите пароль" isPassword />
          <InputField
            name="passwordConfirmed"
            placeholder="Повторите пароль"
            isPassword
          />

          <Row justify="space-between" align="middle">
            <StyledButton type="primary" htmlType="submit" disabled={!isValid}>
              Зарегистрироваться
            </StyledButton>
            <Link to="/auth?tab=login">Войти в аккаунт</Link>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
