import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, List } from 'semantic-ui-react'
import { RequestModel } from '../models/request'
import NavBar from './NavBar'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'

function App() {
  const [requests, setRequests] = useState<RequestModel[]>([])

  useEffect(() => {
    axios.get<RequestModel[]>('http://localhost:5000/api/requests').then((response) => {
      setRequests(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <RequestDashboard requests={requests}/>
      </Container>
    </>
  )
}

export default App
