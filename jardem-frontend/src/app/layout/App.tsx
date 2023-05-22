import { useEffect, useState } from 'react'
import axios from 'axios'
import { Header, Image, List } from 'semantic-ui-react'
import { RequestModel } from '../models/request'

function App() {
  const [requests, setRequests] = useState<RequestModel[]>([])

  useEffect(() => {
    axios.get<RequestModel[]>('http://localhost:5000/api/requests').then((response) => {
      setRequests(response.data)
    })
  }, [])

  return (
    <>
      <Header as='h2'>
        <Image centered src='./assets/logo.png' />
        <Header.Content>Jardem</Header.Content>
      </Header>
      <List>{requests.map((request)=>(
        <List.Item key={request.id}>{request.title}</List.Item>
      ))}</List>
    </>
  )
}

export default App
