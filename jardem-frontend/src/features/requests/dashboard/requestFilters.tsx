import { Form, Segment } from 'semantic-ui-react'

export default function RequestFilters() {
  //https://react.semantic-ui.com/collections/form/#usage-capture-values
  return (
    <Segment>
      <Form >
        <Form.Group>
          <Form.Input placeholder='Name' name='name'  />
          <Form.Input placeholder='Email' name='email' />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    </Segment>
  )
}
