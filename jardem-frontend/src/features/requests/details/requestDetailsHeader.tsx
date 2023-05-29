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
  const { requestStore } = useStore()
  const navigate = useNavigate()

  function handleDelete(e: SyntheticEvent<HTMLDivElement>, id: string) {
    requestStore.deleteRequest(id).then(() => navigate('/requests'))
  }
  return (
    <Segment clearing>
      <Segment compact floated='right' clearing style={{ marginTop: '15px' }}>
        <Dropdown text='Actions' floating loading={requestStore.deleting}>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='pencil'
              text='Edit'
              as={Link}
              to={`/edit/${requestStore.selectedRequest!.id}`}
            />
            <Dropdown.Item
              icon='trash'
              text='Delete'
              name={requestStore.selectedRequest!.id}
              onClick={(e) => handleDelete(e, requestStore.selectedRequest!.id)}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Segment>
      <Segment basic floated='left'>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src='/assets/user.png' />

            <Item.Content>
              <Item.Header as='a'>Header</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>{request.details}</Item.Description>
              <Item.Extra>{request.date}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment>
  )
})
