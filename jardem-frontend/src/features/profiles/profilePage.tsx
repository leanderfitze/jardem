import { Grid } from 'semantic-ui-react'
import ProfileHeader from './profileHeader'
import RequestDetailsMap from '../requests/details/requestDetailsMap'
import ProfileContent from './profileContent'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router'
import { useStore } from '../../app/stores/store'
import { useEffect } from 'react'
import LoadingComponent from '../../app/layout/LoadingComponent'

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { profileStore } = useStore()
  const { loading, loadProfile, profile } = profileStore

  useEffect(() => {
    if (username) loadProfile(username)
  }, [loadProfile, username])

  if (loading) return <LoadingComponent content='Loading profile ...' />

  return (
    <Grid>
      <Grid.Column width={12}>{profile && <ProfileHeader profile={profile} />}</Grid.Column>
      <Grid.Column width={4}>
        <RequestDetailsMap />
      </Grid.Column>
      <Grid.Column width={16}>
        <ProfileContent />
      </Grid.Column>
    </Grid>
  )
})
