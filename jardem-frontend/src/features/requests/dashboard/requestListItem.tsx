import { observer } from 'mobx-react-lite'
import { RequestModel } from '../../../app/models/request'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { Link } from 'react-router-dom'
import RequestListItemParticipants from './requestListItemParticipants'

interface Props {
  request: RequestModel
}

export default observer(function RequestListItem({ request }: Props) {
  const { requestStore, userStore } = useStore()
  return (
    <Segment.Group>
      <Segment>
        <Item.Group divided>
          <Item key={request.id}>
            <Item.Image circular size='tiny' src='/assets/user.png' />
            <Item.Content>
              <Item.Header as={Link} to={`/requests/${request.id}`}>
                {request.title}{' '}
                {request.participants?.some((x) => userStore.user?.userName === x.userName) &&
                  userStore.user?.userName !== request.requesterUserName && (
                    <Label basic color='green'>
                      Participant
                    </Label>
                  )}
              </Item.Header>
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
      {request.participants?.length !== 1 && (
        <Segment secondary>
          <RequestListItemParticipants
            participants={request.participants!.filter(
              (x) => x.userName !== request.requesterUserName
            )}
          />
        </Segment>
      )}
    </Segment.Group>
  )
})
