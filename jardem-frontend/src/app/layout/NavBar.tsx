import { observer } from 'mobx-react-lite'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import { NavLink } from 'react-router-dom'

export default observer(function NavBar() {
  const { requestStore } = useStore()
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          Jardem
        </Menu.Item>
        <Menu.Item name='Requests' as={NavLink} to='/requests' />
        <Menu.Item name='Community' as={NavLink} to='/community' />
        <Menu.Item name='Learn' as={NavLink} to='/learn' />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary as={NavLink} to='/'>
              Ask for help
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary>Sign up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
})
