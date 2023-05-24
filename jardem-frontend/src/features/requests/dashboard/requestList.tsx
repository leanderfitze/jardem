import { Button, Item, Segment } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'
import { SyntheticEvent, useState } from 'react'

interface Props {
  requests: RequestModel[]
  deleting: boolean
  handleSelectedRequest: (id: string) => void
  handleDeleteRequest: (id:string) => void
}

export default function RequestList({ requests, deleting, handleSelectedRequest, handleDeleteRequest}: Props) {
  const [target,setTarget] = useState('')

  function handleDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name)
    handleDeleteRequest(id)
  }

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
                name={request.id}
                className='delete-button'
                floated='right'
                content='Delete'
                onClick={(e) => handleDelete(e,request.id)}
                loading={deleting&&target==request.id}
              />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
