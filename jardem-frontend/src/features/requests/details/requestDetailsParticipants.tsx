import { Header, Image, Item, List, Segment } from 'semantic-ui-react'
import Profile from '../../../app/models/profile'
import { Link } from 'react-router-dom'

interface Props {
  participants: Profile[]
}

export default function RequestDetailsParticipants({ participants }: Props) {
  return (
    <>
      <Segment>
        <Header content='Volunteers' />
        <Item.Group divided>
          {participants.map((participant) => (
            <Item key={participant.userName}>
              <Item.Image src='/assets/user.png' size='mini' circular />
              <Item.Content verticalAlign='middle'>
                <Item.Header as={Link} to={`/profiles/${participant.displayName}`}>{participant.displayName}</Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  )
}
