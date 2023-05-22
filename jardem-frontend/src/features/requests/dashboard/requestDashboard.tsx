import { Grid } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'
import RequestList from './requestList'
import RequestDetails from '../details/requestDetails'
import RequestForm from '../forms/requestForm'

interface Props {
  requests: RequestModel[]
  selectedRequest: RequestModel | undefined
  handleSelectedRequest: (id: string) => void
  handleCancelSelectedRequest: () => void
  editMode: boolean
  handleFormOpen: (id: string) => void
  handleFormClose: () => void
}

export default function RequestDashboard({
  requests,
  selectedRequest,
  editMode,
  handleCancelSelectedRequest,
  handleSelectedRequest,
  handleFormClose,
  handleFormOpen,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RequestList requests={requests} handleSelectedRequest={handleSelectedRequest} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedRequest && (
          <RequestDetails
            handleCancelSelectedRequest={handleCancelSelectedRequest}
            selectedRequest={selectedRequest}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && <RequestForm handleFormClose={handleFormClose} request={selectedRequest}/>}
      </Grid.Column>
    </Grid>
  )
}
