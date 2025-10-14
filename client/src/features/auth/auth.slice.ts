import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  token?: string
  // Add other user fields as needed
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Initialize state from localStorage
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('authToken')
  const userStr = localStorage.getItem('user')
  let user: User | null = null
  
  if (userStr) {
    try {
      user = JSON.parse(userStr)
    } catch {
      localStorage.removeItem('user')
    }
  }

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading: false,
    error: null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      
      // Persist to localStorage
      localStorage.setItem('authToken', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
      
      // Clear localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      
      // Clear localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { setLoading, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer
