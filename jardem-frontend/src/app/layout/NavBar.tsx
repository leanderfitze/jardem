import { observer } from 'mobx-react-lite'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'

export default observer( function NavBar() {
  const {requestStore} = useStore()
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          Jardem
        </Menu.Item>
        <Menu.Item name='Requests' />
        <Menu.Item name='Community' />
        <Menu.Item name='Learn' />
        <Menu.Menu position='right'>
        <Menu.Item>
            <Button primary onClick={()=>requestStore.openForm()}>Ask for help</Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary>Sign up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
})
