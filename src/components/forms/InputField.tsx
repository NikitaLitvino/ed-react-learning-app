import { Row } from 'antd'
import { Field, FieldProps } from 'formik'
import { FC, ReactNode } from 'react'
import {
  FieldContainer,
  StyledErrorMassege,
  StyledInput,
  StyledInputPassword,
} from '../common/StyledComponents'

interface IInputProps {
  name: string
  placeholder?: string
  isPassword?: boolean
  label?: ReactNode
  $marginBottom?: number
  $marginRight?: number
}

export const InputField: FC<IInputProps> = ({
  name,
  placeholder,
  isPassword,
  label,
  $marginBottom,
  $marginRight,
}) => (
  <FieldContainer $marginBottom={$marginBottom} $marginRight={$marginRight}>
    <Field name={name}>
      {({ field, meta: { error, touched } }: FieldProps) => (
        <>
          {label && <Row style={{ marginBottom: 10 }}>{label}</Row>}

          {isPassword ? (
            <StyledInputPassword
              placeholder={placeholder}
              $validationError={error}
              $isTouched={touched}
              {...field}
            />
          ) : (
            <StyledInput
              placeholder={placeholder}
              $validationError={error}
              $isTouched={touched}
              {...field}
            />
          )}
        </>
      )}
    </Field>
    <StyledErrorMassege name={name} component="div" />
  </FieldContainer>
)
