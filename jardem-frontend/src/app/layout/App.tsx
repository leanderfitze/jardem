import { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { requestStore } = useStore()

  useEffect(()=>{
    requestStore.loadRequests()
  },[requestStore])
  
  if (requestStore.loadingInitial) return <LoadingComponent content='Loading app...' />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <RequestDashboard />
      </Container>
    </>
  )
}

export default observer(App)
