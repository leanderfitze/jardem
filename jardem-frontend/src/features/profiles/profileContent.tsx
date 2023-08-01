import { Tab } from 'semantic-ui-react'
import ProfilePhotos from './profilePhotos'

export default function ProfileContent() {
  const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
  ]
  return <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} />
}
