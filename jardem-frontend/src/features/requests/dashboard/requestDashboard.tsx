import { Grid } from 'semantic-ui-react'
import RequestList from './requestList'
import RequestForm from '../forms/requestForm'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import RequestPreview from '../details/requestPreview'
import RequestFilters from './requestFilters'

export default observer(function RequestDashboard() {
  const { requestStore } = useStore()

  useEffect(() => {
    requestStore.loadRequests()
  }, [requestStore])

  if (requestStore.loadingInitial) return <LoadingComponent content='Loading app...' />
  return (
    <Grid>
      <Grid.Column width={10}>
        <RequestList />
      </Grid.Column>
      <Grid.Column width={6}>
        {requestStore.selectedRequest && <RequestPreview />}
        {requestStore.editMode && <RequestForm />}
      </Grid.Column>
    </Grid>
  )
})
