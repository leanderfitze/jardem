import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import RequestDetailsHeader from './requestDetailsHeader'
import RequestDetailsChat from './requestDetailsChat'
import { Grid } from 'semantic-ui-react'
import RequestDetailsMap from './requestDetailsMap'

export default observer(function RequestDetails() {
  const { requestStore } = useStore()
  const { id } = useParams()

  useEffect(() => {
    if (id) requestStore.loadRequest(id)
  }, [id, requestStore])

  if (requestStore.loadingInitial || !requestStore.selectedRequest)
    return <LoadingComponent content='Loading a request...' />

  return (
    <>
    <Grid>
      <Grid.Column width={12}>
      <RequestDetailsHeader request={requestStore.selectedRequest} />
      </Grid.Column>
      <Grid.Column width={4}>
      <RequestDetailsMap/>
      </Grid.Column>
    </Grid>
      <RequestDetailsChat />
    </>
  )
})
