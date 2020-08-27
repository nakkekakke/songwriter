import React from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode } from '../redux/statusReducer'

const DarkThemeSwitch = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.statuses.darkMode)

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={() => dispatch(toggleDarkMode())} color='secondary' />}
      label='Dark theme'
      labelPlacement='top'
      style={{ margin: 6, marginRight: 30 }}
    />
  )
}

export default DarkThemeSwitch