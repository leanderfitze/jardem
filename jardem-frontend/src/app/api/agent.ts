import axios, { AxiosResponse } from 'axios'
import { RequestModel } from '../models/request'

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(500)
    return response
  } catch (error) {
    console.log(error)
    return await Promise.reject(error)
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Requests = {
  list: () => request.get<RequestModel[]>('/requests'),
  details: (id: string) => request.get<RequestModel>(`/requests/${id}`),
  create: (activity: RequestModel) => request.post<void>('/requests',activity),
  update: (activity: RequestModel) => request.put<void>(`/requests/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/requests/${id}`)
}

const agent = {
  Requests,
}

export default agent