import { Button, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router'
import { RequestModel } from '../../../app/models/request'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../../../app/common/form/CustomTextInput'
import CustomTextArea from '../../../app/common/form/CustomTextArea'

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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please add title here'),
    details: Yup.string().required('Please share some details here'),
  })

  function handleFormSubmit(request: RequestModel) {
    request.id
      ? requestStore.updateRequest(request).then(() => navigate(`/requests/${request.id}`))
      : requestStore.createRequest(request).then((id) => navigate(`/requests/${id}`))
  }

  useEffect(() => {
    if (id) requestStore.loadRequest(id).then((request) => setRequest(request!))
  }, [id, requestStore])

  if (requestStore.loadingInitial) return <LoadingComponent content='loading request...' />

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={request}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, dirty, isValid, isSubmitting }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <CustomTextInput name='title' placeholder='Title' label='Title' />
            <CustomTextArea name='details' placeholder='Details' label='Details' />
            <Button
              floated='right'
              className='secondary-button'
              content='Submit'
              loading={isSubmitting}
              disabled={!dirty || isSubmitting || !isValid}
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
