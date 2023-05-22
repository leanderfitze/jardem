import { Button, Container, Menu } from 'semantic-ui-react'

interface Props{
  handleFormOpen: ()=>void
}

export default function NavBar({handleFormOpen}:Props) {
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
            <Button primary onClick={()=>handleFormOpen()}>Ask for help</Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary>Sign up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
