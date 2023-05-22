import { Grid } from 'semantic-ui-react'
import { RequestModel } from '../../../app/models/request'
import RequestList from './requestList'
import RequestDetails from '../details/requestDetails'

interface Props {
  requests: RequestModel[]
}

export default function RequestDashboard({ requests }: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RequestList requests={requests} />
      </Grid.Column>
      <Grid.Column width={6}>{requests[0] && <RequestDetails request={requests[0]} />}</Grid.Column>
    </Grid>
  )
}
