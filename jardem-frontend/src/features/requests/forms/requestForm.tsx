import { Button, Form, Segment } from 'semantic-ui-react'
import { ChangeEvent, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'

export default observer(function RequestForm() {
  const {requestStore} = useStore()
  const initialState = requestStore.selectedRequest ?? {
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
    request.id?requestStore.updateRequest(request):requestStore.createRequest(request)
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
        <Button
          floated='right'
          className='secondary-button'
          content='Submit'
          loading={requestStore.submitting}
        />
        <Button basic color='grey' content='Cancel' onClick={requestStore.closeForm} />
      </Form>
    </Segment>
  )
})
