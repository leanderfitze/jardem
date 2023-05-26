import { Button, Form, Segment } from 'semantic-ui-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router'
import { RequestModel } from '../../../app/models/request'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Link } from 'react-router-dom'

export default observer(function RequestForm() {
  const {requestStore} = useStore()
  const {id} = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState<RequestModel>({
    id: '',
    title: '',
    details: '',
    date: '',
  })

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setRequest({ ...request, [name]: value })
  }

  function handleSubmit() {
    request.id ?
      requestStore.updateRequest(request).then(()=>navigate(`/requests/${request.id}`))
      :requestStore.createRequest(request).then((id)=>navigate(`/requests/${id}`))
  }

  useEffect(()=>{
    if(id) requestStore.loadRequest(id).then(request=>setRequest(request!))
  },[id,requestStore])

  if (requestStore.loadingInitial) return <LoadingComponent content='loading request...'/>

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
        <Button basic color='grey' content='Cancel' as={Link} to={id?`/requests/${id}`:'/requests'} />
      </Form>
    </Segment>
  )
})
