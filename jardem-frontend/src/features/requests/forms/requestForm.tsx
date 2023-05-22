import { Button, Form, Segment } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'

interface Props {
  request: RequestModel | undefined
  handleFormClose: () => void
}

export default function RequestForm({ handleFormClose, request }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.TextArea placeholder='Details' />
        <Button floated='right' className='secondary-button' content='Submit' />
        <Button basic color='grey' content='Cancel' onClick={ handleFormClose} />
      </Form>
    </Segment>
  )
}
