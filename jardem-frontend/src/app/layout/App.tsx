import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Header, Image, List } from 'semantic-ui-react'

function App() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/requests').then((response) => {
      console.log(response)
      setRequests(response.data)
    })
  }, [])

  return (
    <>
      <Header as='h2'>
        <Image centered src='./assets/logo.png' />
        <Header.Content>Jardem</Header.Content>
      </Header>
      <List>{requests.map((request:any)=>(
        <List.Item>{request.title}</List.Item>
      ))}</List>
    </>
  )
}

export default App
