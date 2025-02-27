import { Route, Routes, Navigate  } from 'react-router-dom'
import { useUser } from "./context/userContext";
import LoginForm from './components/auth/LoginForm.jsx'
import RegisterForm from './components/auth/RegisterForm.jsx'
import Home from './pages/Home.jsx'
import MyLogs from './pages/MyLogs.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Header from './components/Header.jsx'

function App() {
  const { user, userRole } = useUser();
 
  return (
    <>
    {user && <Header/>}
    <Routes>
     <Route path="/adminPanel" element={(user && userRole === 'admin') ? <AdminPanel/> : <Navigate to="/" />}/>
     <Route path="/" element={(user && userRole === 'user') ? <Navigate to="/home" /> : <LoginForm />} />
     <Route path="/register" element={<RegisterForm/>}/>
     <Route path="/home" element={(user && userRole === 'user') ? <Home/> : <Navigate to="/" />}/>
     <Route path="/myLogs" element={(user && userRole === 'user') ? <MyLogs/> : <Navigate to="/" />}/>
   </Routes>
   </>
  )
}

export default App
