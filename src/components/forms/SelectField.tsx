import { Row, Select, SelectProps } from 'antd'
import { Field, FieldProps } from 'formik'
import { FC, ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'
import { FieldContainer, StyledErrorMassege } from '../common/StyledComponents'

const { Option } = Select

export const GlobalSelectStyle = createGlobalStyle<{ hasError: boolean }>`
  .ant-select {
    width: 100%
  }

  .ant-select-selector {
    border-color: ${(props) => (props.hasError ? 'red !important' : 'unset')};
  }
`

export interface SelectFieldProps extends SelectProps<any> {
  name: string
  options: any[]
  label?: ReactNode
  shouldUpdate?: { shouldUpdate: () => boolean }
  $marginBottom?: number
}

export const SelectField: FC<SelectFieldProps> = ({
  name,
  options,
  label,
  shouldUpdate,
  $marginBottom,
  ...selectProps
}) => {
  return (
    <FieldContainer $marginBottom={$marginBottom}>
      <Field name={name} {...shouldUpdate}>
        {({
          meta: { initialValue, value, error, touched },
          form: { setFieldValue },
        }: FieldProps) => (
          <Row>
            <GlobalSelectStyle hasError={Boolean(error) && touched} />
            {label && <Row style={{ marginBottom: 10 }}>{label}</Row>}
            <Select
              data-testid="spec_select"
              defaultValue={initialValue || undefined}
              value={value || null}
              onChange={(val) => {
                setFieldValue(name, val)
              }}
              {...selectProps}
            >
              {options &&
                options.length > 0 &&
                options.map((option, index) => (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                ))}
            </Select>
          </Row>
        )}
      </Field>
      <StyledErrorMassege name={name} component="div" />
    </FieldContainer>
  )
}
