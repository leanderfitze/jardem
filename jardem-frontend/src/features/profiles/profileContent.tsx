import { Tab } from 'semantic-ui-react'

export default function ProfileContent() {
  const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane> },
    { menuItem: 'Photos', render: () => <Tab.Pane>Photos</Tab.Pane> },
  ]
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  )
}
