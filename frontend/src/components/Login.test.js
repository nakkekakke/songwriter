import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Login from './Login'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { initialState as authState, login } from '../redux/authReducer'
import { initialState as statusState } from '../redux/statusReducer'

describe('Login component', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)

  const initialState = { auth: authState, statuses: statusState }

  let component
  let store

  beforeEach(() => {
    store = mockStore(initialState)
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    )
  })

  test('inputs can be changed', () => {
    const [usernameInput, passwordInput] = component.container.querySelectorAll('input')

    fireEvent.change(usernameInput, {
      target: { value: 'Some Username' }
    })

    fireEvent.change(passwordInput, {
      target: { value: 'SecretPassword123' }
    })

    expect(usernameInput.value).toEqual('Some Username')
    expect(passwordInput.value).toEqual('SecretPassword123')
  })

  test('form submit dispatches login action', () => {
    const [usernameInput, passwordInput] = component.container.querySelectorAll('input')
    const form = component.container.querySelector('form')

    fireEvent.change(usernameInput, {
      target: { value: 'Some Username' }
    })

    fireEvent.change(passwordInput, {
      target: { value: 'SecretPassword123' }
    })

    fireEvent.submit(form)

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   login('Some Username', 'SecretPassword123')
    // )
  })


})