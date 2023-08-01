import { Header, Item, Segment } from 'semantic-ui-react'

export default function ProfileHeader() {
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image avatar size='small' src={'/assets/user.png'} />
          <Item.Content verticalAlign='middle'>
            <Header as='h1' content='Desplayname' />
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  )
}
