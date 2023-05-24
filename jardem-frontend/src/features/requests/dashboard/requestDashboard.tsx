import { Grid } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'
import RequestList from './requestList'
import RequestDetails from '../details/requestDetails'
import RequestForm from '../forms/requestForm'

interface Props {
  requests: RequestModel[]
  selectedRequest: RequestModel | undefined
  editMode: boolean
  submitting: boolean
  deleting: boolean
  handleSelectedRequest: (id: string) => void
  handleCancelSelectedRequest: () => void
  handleFormOpen: (id: string) => void
  handleFormClose: () => void
  handleCreateOrEditRequest: (request: RequestModel) => void
  handleDeleteRequest: (id: string) => void
}

export default function RequestDashboard({
  requests,
  selectedRequest,
  editMode,
  submitting,
  deleting,
  handleCancelSelectedRequest,
  handleSelectedRequest,
  handleFormClose,
  handleFormOpen,
  handleCreateOrEditRequest,
  handleDeleteRequest,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RequestList
          deleting={deleting}
          requests={requests}
          handleSelectedRequest={handleSelectedRequest}
          handleDeleteRequest={handleDeleteRequest}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedRequest && (
          <RequestDetails
            handleCancelSelectedRequest={handleCancelSelectedRequest}
            selectedRequest={selectedRequest}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && (
          <RequestForm
            submitting={submitting}
            handleFormClose={handleFormClose}
            request={selectedRequest}
            handleCreateOrEditRequest={handleCreateOrEditRequest}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}
