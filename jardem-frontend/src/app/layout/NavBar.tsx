import { observer } from 'mobx-react-lite'
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../stores/store'
import LoginForm from '../../features/users/LoginForm'
import RegistrationForm from '../../features/users/RegistrationForm'

export default observer(function NavBar() {
  const { userStore, modalStore } = useStore()
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
        <Menu.Item name='Errors' as={NavLink} to='/errors' />
        <Menu.Menu position='right'>
          {userStore.isLoggedIn && (
            <Menu.Item>
              <Button primary as={NavLink} to='/'>
                Ask for help
              </Button>
            </Menu.Item>
          )}
          {userStore.isLoggedIn && (
            <Menu.Item>
              <Image src={userStore.user?.image || '/assets/user.png'} avatar spaced='right' />
              <Dropdown pointing='top' text={userStore.user?.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/${userStore.user?.username}`}
                    text='My Profile'
                    icon='user'
                  />
                  <Dropdown.Item onClick={userStore.logout} text='Logout' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
          {!userStore.isLoggedIn && (
            <Menu.Item>
              <Button.Group>
                <Button positive onClick={() => modalStore.openModal(<RegistrationForm />)}>
                  Sign up
                </Button>
                <Button primary onClick={() => modalStore.openModal(<LoginForm />)}>
                  Login
                </Button>
              </Button.Group>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  )
})
