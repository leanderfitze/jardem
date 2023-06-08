import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { useStore } from '../stores/store'
import { useEffect } from 'react'
import LoadingComponent from './LoadingComponent'
import ModalContainer from '../common/modals/modalContainer'

function App() {
  const { userStore, commonStore } = useStore()
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (commonStore.appLoaded) {
    return (
      <>
        <ModalContainer />
        <Toaster position='bottom-right' />
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <Outlet />
        </Container>
      </>
    )
  }

  return <LoadingComponent />
}

export default observer(App)
