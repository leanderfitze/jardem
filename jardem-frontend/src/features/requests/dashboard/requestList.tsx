import { Header } from 'semantic-ui-react'
import { Fragment } from 'react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import RequestListItem from './requestListItem'

export default observer(function RequestList() {
  const { requestStore } = useStore()

  return (
    <>
      {requestStore.groupedRequests.map(([group, requests]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {requests.map((request) => (
            <RequestListItem key={request.id} request={request} />
          ))}
        </Fragment>
      ))}
    </>
  )
})
