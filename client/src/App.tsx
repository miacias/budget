import { Routes, Route } from 'react-router-dom';
import { Components } from './components';
import './App.css'

function App() {

  return (
    <>
      <Components.section.Navigation />
      <Routes>
        <Route path="/" element={<Components.page.Home />} />
        <Route path="/login" element={<Components.page.Login />} />
        <Route path="/budget" element={<Components.page.BudgetDashboard />} />
      </Routes>
    </>
  );
}

export default App
