import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'

interface Props {
  name: string
  placeholder: string
  rows?: number
  label?: string
}
export default function CustomTextArea(props: Props) {
  const [field, meta] = useField(props)

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color='red' pointing>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}
