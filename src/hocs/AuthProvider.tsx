import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { AuthContext } from '../contexts/auth'
import { useApi } from '../hooks/useApi'
import {
  IUser,
  ITask,
  IAttachment,
  ITechnology,
  ISpecialization,
} from '../types'
import { sendErrorNotification } from '../utils/systemNotification'
import { setAuthHeader } from './ApiProvider'

export type AuthProviderState = {
  isLoading: boolean
  user?: IUser
}

export const AuthProvider: FC = ({ children }) => {
  const [state, setState] = useState<AuthProviderState>({ isLoading: true })
  const navigate = useHistory()

  const api = useApi()

  let tech: ITechnology = {
    id: 1,
    title: 'tech',
  }

  let attach: IAttachment = {
    id: 1,
    url: 'attach.com',
  }

  let task: ITask = {
    id: '1',
    title: 'Do',
    description: 'Do something',
    specialization: 'Specialization',
    technologies: tech.title,
    attachments: attach.url,
  }

  const getUserProfile = (): void =>
    setState(() => ({
      isLoading: false,
      user: {
        email: 'hello@gmail.com',
        first_name: 'Nikita',
        id: 1,
        is_admin: true,
        last_name: 'Litvinov',
        completed_tasks: [task],
        active_tasks: [task],
      },
    }))

  useEffect(() => {
    setAuthHeader(api, localStorage.authToken)

    getUserProfile()
  }, [])

  const onLogin = (values: any) => {
    getUserProfile()
    navigate.push('/dashboard')
  }

  const onLogout = () => {
    localStorage.removeItem('authToken')
    navigate.push('/auth')
  }

  if (state.isLoading) {
    return <Loader fullScreen />
  }

  console.log('state', state)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(state.user),
        user: state.user,
        onLogout,
        onLogin,
      }}
    >
      {console.log('hhhhh??')}
      {children}
    </AuthContext.Provider>
  )
}
