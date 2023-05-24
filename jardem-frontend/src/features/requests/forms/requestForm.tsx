import { Button, Form, Segment } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'
import { ChangeEvent, useState } from 'react'

interface Props {
  request: RequestModel | undefined
  submitting: boolean
  handleFormClose: () => void
  handleCreateOrEditRequest: (request: RequestModel) => void
}

export default function RequestForm({
  handleFormClose,
  request: selectedRequest,
  handleCreateOrEditRequest,
  submitting,
}: Props) {
  const initialState = selectedRequest ?? {
    id: '',
    title: '',
    details: '',
    date: '',
  }
  const [request, setRequest] = useState(initialState)

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setRequest({ ...request, [name]: value })
  }

  function handleSubmit() {
    handleCreateOrEditRequest(request)
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Title'
          name='title'
          value={request.title}
          onChange={handleInputOnChange}
        />
        <Form.TextArea
          placeholder='Details'
          name='details'
          value={request.details}
          onChange={handleInputOnChange}
        />
        <Button floated='right' className='secondary-button' content='Submit' loading={submitting}/>
        <Button basic color='grey' content='Cancel' onClick={handleFormClose} />
      </Form>
    </Segment>
  )
}
