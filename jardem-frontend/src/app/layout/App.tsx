import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { RequestModel } from '../models/request'
import NavBar from './NavBar'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [requests, setRequests] = useState<RequestModel[]>([])
  const [selectedRequest, setSelectedRequest] = useState<RequestModel | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
    if (request.id) {
      setSubmitting(true)
      agent.Requests.update(request).then(() => {
        setRequests([...requests.filter((x) => x.id !== request.id), request])
        setSubmitting(false)
        setEditMode(false)
        setSelectedRequest(request)
      })
    } else {
      setSubmitting(true)
      request.id = uuid()
      request.date = new Date().toISOString()
      agent.Requests.create(request).then(() => {
        setRequests([...requests, request])
        setEditMode(false)
        setSelectedRequest(request)
        setSubmitting(false)
      })
    }
  }

  function handleDeleteRequest(id: string) {
    setDeleting(true)
    agent.Requests.delete(id).then(() => {
      if (id === selectedRequest?.id) setSelectedRequest(undefined)
      setRequests([...requests.filter((x) => x.id !== id)])
      setEditMode(false)
      setDeleting(false)
    })
  }

  useEffect(() => {
    agent.Requests.list().then((response) => {
      setRequests(response)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingComponent content='Loading app...' />
  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <RequestDashboard
          editMode={editMode}
          requests={requests}
          selectedRequest={selectedRequest}
          submitting={submitting}
          deleting={deleting}
          handleCancelSelectedRequest={handleCancelSelectedRequest}
          handleSelectedRequest={handleSelectedRequest}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          handleCreateOrEditRequest={handleCreatOrEditRequest}
          handleDeleteRequest={handleDeleteRequest}
        />
      </Container>
    </>
  )
}

export default App
