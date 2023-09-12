import { Row, Select, Tag } from 'antd'
import { Field, FieldProps } from 'formik'
import { FC } from 'react'
import { GlobalSelectStyle, SelectFieldProps } from './SelectField'
import { FieldContainer, StyledErrorMassege } from '../common/StyledComponents'

const { Option } = Select

export const MultipleSelectField: FC<SelectFieldProps> = ({
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
              defaultValue={initialValue}
              // value={value || null}
              onChange={(val) => {
                setFieldValue(name, val)
              }}
              mode="multiple"
              allowClear
              tagRender={({ label, onClose }) => (
                <Tag closable onClose={onClose} color="green">
                  {label}
                </Tag>
              )}
              {...selectProps}
            >
              {options &&
                options.length > 0 &&
                options.map((option, index) => (
                  <Option
                    key={option.id}
                    value={option.title}
                    data-testid="tech_option"
                  >
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
