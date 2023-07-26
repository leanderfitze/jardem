import { observer } from 'mobx-react-lite'
import { Image, List } from 'semantic-ui-react'
import { Profile } from '../../../app/models/profile'
import { Link } from 'react-router-dom'

interface Props {
  participants: Profile[]
}

export default observer(function RequestListItemParticipants({ participants }: Props) {
  return (
    <List horizontal>
      {participants.map((participant) => (
        <List.Item key={participant.userName} as={Link} to={`/profiles/${participant.userName}`}>
          <Image size='mini' src={participant.image || '/assets/user.png'} circular />
        </List.Item>
      ))}
    </List>
  )
})
