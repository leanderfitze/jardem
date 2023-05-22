import { Button, Form, Segment } from 'semantic-ui-react'

export default function RequestForm() {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.TextArea placeholder='Details' />
        <Button floated='right' className='secondary-button' content='Submit' />
        <Button basic color='grey' content='Cancel' />
      </Form>
    </Segment>
  )
}
