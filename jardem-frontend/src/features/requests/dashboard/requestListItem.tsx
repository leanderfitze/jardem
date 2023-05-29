import { observer } from 'mobx-react-lite'
import { RequestModel } from '../../../app/models/request'
import { Button, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { Link } from 'react-router-dom'

interface Props {
  request: RequestModel
}

export default observer(function RequestListItem({ request }: Props) {
  const { requestStore } = useStore()
  return (
    <Segment.Group>
      <Segment>
        <Item.Group divided>
          <Item key={request.id}>
            <Item.Image circular size='tiny' src='/assets/user.png' />
            <Item.Content>
              <Item.Header as={Link} to={`/requests/${request.id}`}>
                {request.title}
              </Item.Header>
              <Item.Description></Item.Description>
              <Item.Meta>{request.date}</Item.Meta>
              <Item.Description>{request.details}</Item.Description>
            </Item.Content>

            
              <Button
                className='secondary-button'
                floated='right'
                content='Preview'
                onClick={() => requestStore.selectRequest(request.id)}
              />
          
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary>
        <Segment secondary>Helping people goes here </Segment>
      </Segment>
    </Segment.Group>
  )
})
