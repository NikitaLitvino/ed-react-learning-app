import { Button, Typography, Input } from 'antd'
import { ErrorMessage } from 'formik'
import styled, { css } from 'styled-components'

interface IInputProps {
  $validationError?: string
  $isTouched?: boolean
}

interface IContainerProps {
  $marginBottom?: number
  $marginRight?: number
}

const { Text } = Typography

export const StyledText = styled(Text)`
  color: #555555;
  font-size: 16px;
`

export const StyledTitile = styled(Text)`
  color: #555555;
  font-size: 16px;
  text-overflow: ellipsis;
`

export const StyledErrorMassege = styled(ErrorMessage)`
  position: absolute;
  color: red;
`

export const FieldContainer = styled.div<IContainerProps>`
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom ?? 28}px`};
  margin-right: ${({ $marginRight }) => `${$marginRight ?? 0}px`};
`

export const StyledInput = styled(Input)<IInputProps>`
  height: 40px;
  ${({ $validationError, $isTouched }) =>
    $validationError &&
    $isTouched &&
    css`
      border-color: red;
      box-shadow: none;
    `};
`

export const StyledInputPassword = styled(Input.Password)<IInputProps>`
  height: 40px;
  ${({ $validationError, $isTouched }) =>
    $validationError &&
    $isTouched &&
    css`
      border-color: red;
      box-shadow: none;
    `};
`

export const StyledButton = styled(Button)`
  height: 40px;
`
