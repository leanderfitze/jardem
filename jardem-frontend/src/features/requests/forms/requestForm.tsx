import { Button, Segment } from 'semantic-ui-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router'
import { RequestModel } from '../../../app/models/request'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

export default observer(function RequestForm() {
  const { requestStore } = useStore()
  const { id } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState<RequestModel>({
    id: '',
    title: '',
    details: '',
    date: '',
  })

  // function handleInputOnChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = e.target
  //   setRequest({ ...request, [name]: value })
  // }

  // function handleSubmit() {
  //   request.id ?
  //     requestStore.updateRequest(request).then(()=>navigate(`/requests/${request.id}`))
  //     :requestStore.createRequest(request).then((id)=>navigate(`/requests/${id}`))
  // }

  useEffect(() => {
    if (id) requestStore.loadRequest(id).then((request) => setRequest(request!))
  }, [id, requestStore])

  if (requestStore.loadingInitial) return <LoadingComponent content='loading request...' />

  return (
    <Segment clearing>
      <Formik enableReinitialize initialValues={request} onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <Field
              placeholder='Title'
              name='title'
            />
            <Field
              placeholder='Details'
              name='details'
            />
            <Button
              floated='right'
              className='secondary-button'
              content='Submit'
              loading={requestStore.submitting}
            />
            <Button
              basic
              color='grey'
              content='Cancel'
              as={Link}
              to={id ? `/requests/${id}` : '/requests'}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})
