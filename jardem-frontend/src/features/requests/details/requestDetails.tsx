import { Button, Card, Image } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'

interface Props {
  selectedRequest: RequestModel
  handleCancelSelectedRequest: () => void
  handleFormOpen: (id:string) => void
}

export default function RequestDetails({ selectedRequest, handleCancelSelectedRequest, handleFormOpen }: Props) {
  return (
    <Card>
      <Image src='/assets/user.png' fluid />
      <Card.Content>
        <Card.Header>{selectedRequest.title}</Card.Header>
        <Card.Meta>
          <span>Requested on {selectedRequest.date}</span>
        </Card.Meta>
        <Card.Description>{selectedRequest.details}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='grey' content='Close' onClick={() => handleCancelSelectedRequest()} />
        <Button floated='right' className='secondary-button' content='Edit' onClick={()=>handleFormOpen(selectedRequest.id)} />
      </Card.Content>
    </Card>
  )
}
