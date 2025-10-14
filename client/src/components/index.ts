import { BudgetDashboard } from "../components/BudgetDashboard";
import { IncomeMenu } from "../components/IncomeMenu";
import { Home } from "../components/Home";
// import { ProtectedRoute } from '../components'
import { Login } from "../components/Login";
import { Navigation } from "../components/Navigation";
import { Layout } from "../components/Layout";
import { CreateAccountForm } from "../components/CreateAccountForm";
import { Button, Field, FormLabel } from './ui';

export const Page = {
  Home,
  Login,
  BudgetDashboard,
};

export const Section = {
  // ProtectedRoute,
  Navigation,
  Layout,
  IncomeMenu,
};

export const UI = {
  CreateAccountForm,
  Button,
  Field,
  FormLabel,
};