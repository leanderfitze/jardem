import { Button, Card, Image } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'

interface Props {
  request: RequestModel
}

export default function RequestDetails({ request }: Props) {
  return (
    <Card>
      <Image src='/assets/user.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{request.title}</Card.Header>
        <Card.Meta>
          <span>Requested on {request.date}</span>
        </Card.Meta>
        <Card.Description>{request.details}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button className='secondary-button' content='Edit'/>
            <Button basic color='grey' content='Close'/>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
