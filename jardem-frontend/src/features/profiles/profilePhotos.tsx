import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { useState } from 'react'

export default observer(function ProfilePhotos() {
  const { profileStore } = useStore()
  const { profile, isCurrentUser } = profileStore
  const [addPhotoMode, setAddPhotoMode] = useState(false)

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <p>Photo widget will go here</p>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile?.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
})
