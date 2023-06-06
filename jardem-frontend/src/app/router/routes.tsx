import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import RequestDashboard from '../../features/requests/dashboard/requestDashboard'
import CommunityPage from '../../features/community/communityPage'
import LearnPage from '../../features/learn/learnPage'
import RequestForm from '../../features/requests/forms/requestForm'
import RequestDetails from '../../features/requests/details/requestDetails'
import TestError from '../../features/errors/TestError'
import NotFound from '../../features/errors/NotFound'
import ServerError from '../../features/errors/ServerError'
import LoginForm from '../../features/users/LoginForm'
import HomePage from '../../features/home/homePage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'edit/:id', element: <RequestForm key='edit' /> },
      { path: 'errors', element: <TestError /> },
      { path: 'learn', element: <LearnPage /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'requests', element: <RequestDashboard /> },
      { path: 'requests/:id', element: <RequestDetails /> },
      { path: 'server-error', element: <ServerError /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
