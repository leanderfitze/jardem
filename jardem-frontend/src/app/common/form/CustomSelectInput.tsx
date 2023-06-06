import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'

interface Props {
  name: string
  placeholder: string
  label?: string
  options:{ value: string; text: string }[];
}
export default function CustomSelectInput(props: Props) {
  const [field, meta] = useField(props)

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {props.label && <label>{props.label}</label>}
      <Form.Select
        {...field}
        {...props}
        placeholder={props.placeholder}
        onChange={(e, { value }) => {
          const event = { target: { name: props.name, value } };
          field.onChange(event as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red' pointing>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}
