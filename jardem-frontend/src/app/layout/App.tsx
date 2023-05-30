import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster position='bottom-right'/>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
        <Outlet/>
        </Container>
      </>
  )
}

export default observer(App)
