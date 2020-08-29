import React, { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithToken } from '../../redux/authReducer'
import LoadingScreen from '../LoadingScreen'
import SnackbarAlert from '../SnackbarAlert'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  const darkMode = useSelector((state) => state.statuses.darkMode)

  useEffect(() => {
    const jsonUser = localStorage.getItem('SongWriterUser')
    if (jsonUser) {
      const authUser = JSON.parse(jsonUser)
      dispatch(loginWithToken(authUser))
    }
  }, [dispatch])

  const lightTheme = createMuiTheme({})

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      background: {
        default: '#000' //'#1c1c1c'
      },
      primary: {
        //main: ''//'#2a367b',
        main: '#354599',//lightTheme.palette.primary.main,
        dark: '#263271', //'#2a367b',//'#222c64',
        light: lightTheme.palette.primary.main
      },
      secondary: {
        main: '#84002f',
        dark: '#620023',
        light: lightTheme.palette.primary.main
      }
    }
  })

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Suspense fallback={<LoadingScreen />}>
          {user ?
            <AuthenticatedApp/> :
            <UnauthenticatedApp />
          }
        </Suspense>
        <SnackbarAlert />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App