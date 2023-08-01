import { observer } from 'mobx-react-lite'
import { RequestModel } from '../../../app/models/request'
import { Segment, Item, Dropdown } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import { SyntheticEvent } from 'react'
import { useStore } from '../../../app/stores/store'

interface Props {
  request: RequestModel
}

export default observer(function RequestDetailsHeader({ request }: Props) {
  const { requestStore, userStore } = useStore()
  const navigate = useNavigate()

  function handleDelete(e: SyntheticEvent<HTMLDivElement>, id: string) {
    requestStore.deleteRequest(id).then(() => navigate('/requests'))
  }
  return (
    <Segment clearing>
      <Segment compact floated='right' clearing style={{ marginTop: '15px' }}>
        <Dropdown text='Actions' floating loading={requestStore.deleting}>
          <Dropdown.Menu>
            {userStore.user?.userName === requestStore.selectedRequest!.requesterUserName && (
              <>
                <Dropdown.Item
                  icon='pencil'
                  text='Edit'
                  as={Link}
                  to={`/edit/${requestStore.selectedRequest!.id}`}
                />
                <Dropdown.Item icon='check' text='Resolve' onClick={() => requestStore.resolve()} />
                <Dropdown.Item
                  icon='trash'
                  text='Delete'
                  name={requestStore.selectedRequest!.id}
                  onClick={(e) => handleDelete(e, requestStore.selectedRequest!.id)}
                />
              </>
            )}

            {userStore.user?.userName !== requestStore.selectedRequest!.requesterUserName && (
              <>
                <Dropdown.Item
                  icon='user plus'
                  text='Volunteer'
                  onClick={() => requestStore.participate()}
                />
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Segment>
      <Segment basic floated='left'>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src={request.requester?.image || '/assets/user.png'} />

            <Item.Content>
              <Item.Header>{request.title}</Item.Header>
              <Item.Description>{request.details}</Item.Description>
              <Item.Meta as='a'>
                Requested by{' '}
                <b>
                  {' '}
                  <Link to={`/profiles/${request.requesterUserName}`}>
                    {
                      request.participants?.find((x) => x.userName === request.requesterUserName)
                        ?.displayName
                    }
                  </Link>
                </b>
              </Item.Meta>
              <Item.Extra>{request.date}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment>
  )
})
