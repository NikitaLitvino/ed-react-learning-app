import { Link } from 'react-router-dom'
import { Checkbox, Row } from 'antd'
import { Formik, Form } from 'formik'
import { SingInSchema } from '../../forms/validators'
import { InputField } from '../forms/InputField'
import { StyledButton } from '../common/StyledComponents'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

export const SignIn = () => {
  const navigate = useHistory()
  const { onLogin } = useAuth()

  const lazySignIn =()=>{
    localStorage.setItem("authToken", "sadqeqwdasd")
    navigate.push("/dashboard")
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={lazySignIn}
      validationSchema={SingInSchema}
    >
      {({ isValid }) => (
        <Form>
          <InputField name="username" placeholder="Email" />

          <InputField
            $marginBottom={22}
            name="password"
            placeholder="Пароль"
            isPassword
          />

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 22 }}
          >
            <Checkbox>Запомнить меня</Checkbox>

            <Link to="/forget-password">Забыли пароль</Link>
          </Row>

          <StyledButton
            block
            type="primary"
            htmlType="submit"
            style={{ marginBottom: 22 }}
            disabled={!isValid}
          >
            Вход
          </StyledButton>

          <Row justify="end">
            <Link to="/auth?tab=sign-up">Регистрация</Link>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
