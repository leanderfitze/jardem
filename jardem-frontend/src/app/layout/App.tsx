import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { RequestModel } from '../models/request'
import NavBar from './NavBar'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'

function App() {
  const [requests, setRequests] = useState<RequestModel[]>([])
  const [selectedRequest, setSelectedRequest] = useState<RequestModel | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  function handleSelectedRequest(id: string) {
    handleFormClose()
    setSelectedRequest(requests.find((x) => x.id === id))
  }

  function handleCancelSelectedRequest() {
    setSelectedRequest(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedRequest(id) : handleCancelSelectedRequest()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreatOrEditRequest(request: RequestModel) {
    request.id
      ? setRequests([...requests.filter((x) => x.id !== request.id), request])
      : setRequests([...requests, { ...request, id: uuid(), date: new Date().toISOString() }])
    setEditMode(false)
    setSelectedRequest(request)
  }

  function handleDeleteRequest(id: string) {
    setSelectedRequest(undefined)
    setRequests([...requests.filter((x) => x.id !== id)])
  }

  useEffect(() => {
    agent.Requests.list().then((response) => {
      setRequests(response)
    })
  }, [])

  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <RequestDashboard
          editMode={editMode}
          requests={requests}
          selectedRequest={selectedRequest}
          handleCancelSelectedRequest={handleCancelSelectedRequest}
          handleSelectedRequest={handleSelectedRequest}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          handleCreateOrEditRequest={handleCreatOrEditRequest}
          handleDeleteRequest = {handleDeleteRequest}
        />
      </Container>
    </>
  )
}

export default App
