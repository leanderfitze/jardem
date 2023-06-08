import { ErrorMessage, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { UserType } from '../../app/models/user'
import { Form } from 'react-router-dom'
import CustomTextInput from '../../app/common/form/CustomTextInput'
import CustomSelectInput from '../../app/common/form/CustomSelectInput'
import { Button, Header } from 'semantic-ui-react'
import ValidationError from '../errors/ValidationError'

export default observer(function RegistrationForm() {
  const { userStore } = useStore()

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        userName: '',
        displayName: '',
        userType: undefined,
        error: null,
      }}
      onSubmit={ (values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as={'h2'} content='Sign up to the system' color='teal' textAlign='center' />
          <CustomTextInput placeholder='Email' name='email' />
          <CustomTextInput placeholder='User Name' name='userName' />
          <CustomTextInput placeholder='Display Name' name='displayName' />
          <CustomSelectInput
            placeholder='User Type'
            name='userType'
            options={[
              { value: UserType.Requester, text: UserType.Requester },
              { value: UserType.Volunteer, text: UserType.Volunteer },
            ]}
          />
          <CustomTextInput placeholder='Password' name='password' type='password' />
          <ErrorMessage
            name='error'
            render={() => (
              <ValidationError errors={errors.error} />
            )}
          />
          <Button loading={isSubmitting} positive content='Sign up' type='submit' fluid />
        </Form>
      )}
    </Formik>
  )
})
