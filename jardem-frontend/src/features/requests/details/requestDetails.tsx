import { Button, Card, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

export default observer(function RequestDetails() {
  const { requestStore } = useStore()
  return (
    <Card>
      <Image src='/assets/user.png' fluid />
      <Card.Content>
        <Card.Header>{requestStore.selectedRequest!.title}</Card.Header>
        <Card.Meta>
          <span>Requested on {requestStore.selectedRequest!.date}</span>
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
          content='Edit'
          onClick={() => requestStore.openForm(requestStore.selectedRequest!.id)}
        />
      </Card.Content>
    </Card>
  )
})
