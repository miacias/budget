import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../redux/store'
import { loginSuccess, loginFailure, logout } from './auth.slice'
import type { User } from './auth.slice'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  data?: {
    id: string
    firstName: string
    lastName: string
    email: string
    token: string
  }
  error?: string
  message?: string
  status?: number
}

interface AuthValidationResponse {
  success: boolean;
  data?: {
    id: string;
    email: string;
  }
  error?: string;
  message?: string;
  status?: number;
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
          const { data: response } = await queryFulfilled
          const user: User = {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          }
          dispatch(loginSuccess({ user, token: response.data.token }))
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
        try {
          await queryFulfilled
          dispatch(logout())
        } catch {
          dispatch(logout()) // logs out locally even if API call fails
        }
      },
    }),
    validateToken: builder.query<AuthValidationResponse, void>({
      query: () => '/api/auth/validate',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled
          if (!response.success) {
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