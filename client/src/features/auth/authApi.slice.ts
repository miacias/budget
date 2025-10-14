import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../redux/store'
import { loginSuccess, loginFailure, logout } from './auth.slice'
import type { User } from './auth.slice'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
  message?: string
}

interface AuthValidationResponse {
  valid: boolean
  user?: User
  message?: string
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(loginSuccess({ user: data.user, token: data.token }))
        } catch (error) {
          dispatch(loginFailure('Login failed. Please check your credentials.'))
        }
      },
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(logout())
        try {
          await queryFulfilled
        } catch {
          // Even if the API call fails, we still want to log out locally
        }
      },
    }),
    validateToken: builder.query<AuthValidationResponse, void>({
      query: () => '/api/auth/validate',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (!data.valid) {
            dispatch(logout())
          }
        } catch {
          dispatch(logout())
        }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useValidateTokenQuery } = authApiSlice