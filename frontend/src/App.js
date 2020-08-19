import React, { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithToken } from './redux/authReducer'
import LoadingScreen from './LoadingScreen'

const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const jsonUser = localStorage.getItem('SongWriterUser')
    console.log('Getting user effect')
    if (jsonUser) {
      const authUser = JSON.parse(jsonUser)
      dispatch(loginWithToken(authUser))
    }
  }, [dispatch])

  return (
    <Suspense fallback={<LoadingScreen />}>
      {user ?
        <AuthenticatedApp/> :
        <UnauthenticatedApp />
      }
    </Suspense>
  )
}

export default App