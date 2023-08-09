import { Header, Item, Segment } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { observer } from 'mobx-react-lite'

interface Props {
  profile: Profile 
}

export default observer( function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
          <Item.Content verticalAlign='middle'>
            <Header as='h1' content={profile.displayName} />
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  )
}
)