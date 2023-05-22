import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Header, Image, List } from 'semantic-ui-react'
import { RequestModel } from '../models/request'
import NavBar from './NavBar'

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
        <List>
          {requests.map((request) => (
            <List.Item key={request.id}>{request.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  )
}

export default App
