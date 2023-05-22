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
}

export default function RequestDashboard({
  requests,
  selectedRequest,
  handleCancelSelectedRequest,
  handleSelectedRequest,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RequestList requests={requests} handleSelectedRequest={handleSelectedRequest}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedRequest && (
          <RequestDetails
            handleCancelSelectedRequest={handleCancelSelectedRequest}
            selectedRequest={selectedRequest}
          />
        )}
        <RequestForm />
      </Grid.Column>
    </Grid>
  )
}
