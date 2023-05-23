import { Button, Item, Segment } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'

interface Props {
  requests: RequestModel[]
  handleSelectedRequest: (id: string) => void
  handleDeleteRequest: (id:string) => void
}

export default function RequestList({ requests, handleSelectedRequest, handleDeleteRequest}: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {requests.map((request) => (
          <Item key={request.id}>
            <Item.Content>
              <Item.Header as='a'>{request.title}</Item.Header>
              <Item.Meta>{request.date}</Item.Meta>
              <Item.Description>{request.details}</Item.Description>
              <Item.Extra>
              <Button
                  className='secondary-button'
                  floated='right'
                  content='View'
                  onClick={() => handleSelectedRequest(request.id)}
                />
                <Button
                className='delete-button'
                floated='right'
                content='Delete'
                onClick={() => handleDeleteRequest(request.id)}
              />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
