import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { SyntheticEvent, useState } from 'react'
import PhotoUploadWidget from '../../app/common/photoUpload/photoUploadWidget'

export default observer(function ProfilePhotos() {
  const { profileStore } = useStore()
  const {
    profile,
    isCurrentUser,
    uploading,
    uploadPhoto,
    settingMainPhoto,
    setMainPhoto,
    deletingPhoto,
    deletePhoto,
  } = profileStore
  const [addPhotoMode, setAddPhotoMode] = useState(false)
  const [target, setTarget] = useState('')

  function handleMainPhoto(photo: string, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name)
    setMainPhoto(photo)
  }

  function handleDeletePhoto(photo: string, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name)
    deletePhoto(photo)
  }

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false))
  }

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
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile?.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group widths={2}>
                    <Button
                      icon='user circle outline'
                      name={photo.id}
                      color='green'
                      basic
                      disabled={photo.url === profile.image || deletingPhoto || settingMainPhoto}
                      loading={target === photo.id && settingMainPhoto}
                      onClick={(e) => handleMainPhoto(photo.id, e)}
                    />
                    <Button
                      icon='trash alternate outline'
                      name={photo.id}
                      color='red'
                      basic
                      disabled={photo.url === profile.image || settingMainPhoto || deletingPhoto}
                      loading={target === photo.id && deletingPhoto}
                      onClick={(e) => handleDeletePhoto(photo.id, e)}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
})
