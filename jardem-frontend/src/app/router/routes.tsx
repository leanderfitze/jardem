import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'
import CommunityPage from '../../features/community/communityPage'
import LearnPage from '../../features/learn/learnPage'
import RequestForm from '../../features/requests/forms/requestForm'
import RequestDetails from '../../features/requests/details/requestDetails'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <RequestForm key='create'/> },
      { path: 'edit/:id', element: <RequestForm key='edit'/> },
      { path: 'requests', element: <RequestDashboard /> },
      { path: 'requests/:id', element: <RequestDetails /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'learn', element: <LearnPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
