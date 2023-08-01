import { Grid } from 'semantic-ui-react'
import ProfileHeader from './progileHeader'
import RequestDetailsMap from '../requests/details/requestDetailsMap'
import ProfileContent from './profileContent'

export default function ProfilePage() {
  return (
    <Grid>
      <Grid.Column width={12}>
        <ProfileHeader />
      </Grid.Column>
      <Grid.Column width={4}>
        <RequestDetailsMap />
      </Grid.Column>
      <Grid.Column width={16}>
        <ProfileContent />
      </Grid.Column>
    </Grid>
  )
}
