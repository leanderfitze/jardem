import axios, { AxiosError, AxiosResponse } from 'axios'
import { RequestModel } from '../models/request'
import { toast } from 'react-hot-toast'
import { router } from '../router/routes'
import { store } from '../stores/store'

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(
  async (response) => {
    await sleep(500)
    return response
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse
    switch (status) {
      case 400:
        if(config.method==='get' && data.errors.hasOwnProperty('id')){
          router.navigate('/not-found')
        }
        if (data.errors) {
          const modalStateErrors = []
          for (const key in data.errors) {
            if (data.errors[key]) modalStateErrors.push(data.errors[key])
          }
          throw modalStateErrors.flat()
        }
        else{
          toast.error(data)
        }
        break
      case 401:
        toast.error('Unauthorised')
        break
      case 403:
        toast.error('forbidden')
        break
      case 404:
        router.navigate('/not-found')
        break
      case 500:
        store.commonStore.setServerError(data)
        router.navigate('/server-error')
        break
    }
    return Promise.reject(error)
  }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Requests = {
  list: () => request.get<RequestModel[]>('/requests'),
  details: (id: string) => request.get<RequestModel>(`/requests/${id}`),
  create: (req: RequestModel) => request.post<void>('/requests', req),
  update: (req: RequestModel) => request.put<void>(`/requests/${req.id}`, req),
  delete: (id: string) => request.del<void>(`/requests/${id}`),
}

const agent = {
  Requests,
}

export default agent
