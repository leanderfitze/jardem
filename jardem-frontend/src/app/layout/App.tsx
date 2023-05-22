import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, List } from 'semantic-ui-react'
import { RequestModel } from '../models/request'
import NavBar from './NavBar'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'

function App() {
  const [requests, setRequests] = useState<RequestModel[]>([])
  const [selectedRequest, setSelectedRequest] = useState<RequestModel | undefined>(undefined)

  function handleSelectedRequest(id: string) {
    setSelectedRequest(requests.find((x) => x.id === id))
  }

  function handleCancelSelectedRequest() {
    setSelectedRequest(undefined)
  }

  useEffect(() => {
    axios.get<RequestModel[]>('http://localhost:5000/api/requests').then((response) => {
      setRequests(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <RequestDashboard
          requests={requests}
          handleCancelSelectedRequest={handleCancelSelectedRequest}
          handleSelectedRequest={handleSelectedRequest}
          selectedRequest={selectedRequest}
        />
      </Container>
    </>
  )
}

export default App
