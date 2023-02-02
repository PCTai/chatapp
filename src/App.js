
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';
import useAuth from './customhook/useAuth';

function App() {
  
  const {currentUser} =useAuth();
  
  return (
    <Routes>
      <Route path='login' element={currentUser ? <Navigate to={'/home'}/> :<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='/' element={currentUser ? <Navigate to={'/home'}/> :<Navigate to={'/login'}/>}/>
      <Route path='home/*' element={currentUser!=null ? <ChatRoom/> :<Navigate to={'/login'}/>}/>
     
    </Routes>
    
  );
}

export default App;
