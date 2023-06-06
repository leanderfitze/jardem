import { ErrorMessage, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { UserType } from '../../app/models/user'
import { Form } from 'react-router-dom'
import CustomTextInput from '../../app/common/form/CustomTextInput'
import CustomSelectInput from '../../app/common/form/CustomSelectInput'
import { Button, Label } from 'semantic-ui-react'

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
        userStore.register(values).catch((error) => setErrors({ error: 'Invalide email or password' }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
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
              <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />
            )}
          />
          <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
        </Form>
      )}
    </Formik>
  )
})
