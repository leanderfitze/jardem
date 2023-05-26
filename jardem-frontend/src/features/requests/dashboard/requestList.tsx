import { Button, Item, Segment } from 'semantic-ui-react'
import { SyntheticEvent, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'

export default observer(function RequestList() {
  const { requestStore } = useStore()
  const [target, setTarget] = useState('')

  function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    requestStore.deleteRequest(id)
  }

  return (
    <Segment>
      <Item.Group divided>
        {requestStore.requestsByDate.map((request) => (
          <Item key={request.id}>
            <Item.Content>
              <Item.Header as='a'>{request.title}</Item.Header>
              <Item.Meta>{request.date}</Item.Meta>
              <Item.Description>{request.details}</Item.Description>
              <Item.Extra>
                <Button
                  className='secondary-button'
                  floated='right'
                  content='Preview'
                  onClick={() => requestStore.selectRequest(request.id)}
                  
                />
                <Button
                  name={request.id}
                  className='delete-button'
                  floated='right'
                  content='Delete'
                  onClick={(e) => handleDelete(e, request.id)}
                  loading={requestStore.deleting && target === request.id}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
})
