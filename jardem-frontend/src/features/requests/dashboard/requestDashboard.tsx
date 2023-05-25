import { Grid } from 'semantic-ui-react'
import RequestList from './requestList'
import RequestDetails from '../details/requestDetails'
import RequestForm from '../forms/requestForm'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

export default observer(function RequestDashboard() {
  const { requestStore } = useStore()
  return (
    <Grid>
      <Grid.Column width={10}>
        <RequestList />
      </Grid.Column>
      <Grid.Column width={6}>
        {requestStore.selectedRequest && <RequestDetails />}
        {requestStore.editMode && <RequestForm />}
      </Grid.Column>
    </Grid>
  )
})
