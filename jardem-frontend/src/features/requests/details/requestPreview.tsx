import { Button, Card, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Link } from 'react-router-dom'

export default observer(function RequestPreview() {
  const { requestStore } = useStore()
  const { id } = useParams()

  useEffect(() => {
    if (id) requestStore.loadRequest(id)
  }, [id, requestStore])

  if (requestStore.loadingInitial || !requestStore.selectedRequest)
    return <LoadingComponent content='Loading a request...' />

  return (
    <Card style={{ position: 'fixed' }}>
      <Image src={requestStore.selectedRequest.requester?.image || '/assets/user.png'} fluid />
      <Card.Content>
        <Card.Header>{requestStore.selectedRequest.title}</Card.Header>
        <Card.Meta>
          <span>Requested on {requestStore.selectedRequest.date}</span>
        </Card.Meta>
        <Card.Description>{requestStore.selectedRequest!.details}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          color='grey'
          content='Close'
          onClick={() => requestStore.cancelSelectedRequest()}
        />
        <Button
          floated='right'
          className='secondary-button'
          content='View'
          as={Link}
          to={`/requests/${requestStore.selectedRequest.id}`}
        />
      </Card.Content>
    </Card>
  )
})
