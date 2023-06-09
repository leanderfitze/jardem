import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import RequestDetailsHeader from './requestDetailsHeader'
import RequestDetailsChat from './requestDetailsChat'
import { Grid } from 'semantic-ui-react'
import RequestDetailsMap from './requestDetailsMap'
import RequestDetailsParticipants from './requestDetailsParticipants'

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
        <Grid.Column width={10}>
          <RequestDetailsHeader request={requestStore.selectedRequest} />
        </Grid.Column>
        <Grid.Column width={6}>
          <RequestDetailsMap />
        </Grid.Column>
        <Grid.Column width={10}>
          <RequestDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <RequestDetailsParticipants
            participants={requestStore.selectedRequest.participants!.filter(
              (x) => x.userName !== requestStore.selectedRequest?.requesterUserName
            )}
          />
        </Grid.Column>
      </Grid>
    </>
  )
})
