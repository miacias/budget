import { BudgetDashboard } from '../components/BudgetDashboard'
import { IncomeMenu } from '../components/IncomeMenu'
import { Home } from '../components/Home'
// import ProtectedRoute from '../components'
import { Login } from '../components/Login'
import { Navigation } from '../components/Navigation'
import { Layout } from '../components/Layout'

export const Components = {
  page: {
    Home,
    Login,
    // ProtectedRoute,
    BudgetDashboard,
  },
  section: {
    Navigation,
    Layout,
    IncomeMenu,
  },
  ui: {},
}