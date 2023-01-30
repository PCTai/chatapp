
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';
import useAuth from './customhook/useAuth';

function App() {
  // const dispatch = useDispatch();
  const {currentUser} =useAuth();
  // useEffect(() =>{
  //   onAuthStateChanged(auth, (user) =>{
  //       if(user){
  //         const {uid, displayName, photoURL, email: mail}= user;
  //         dispatch(appActions.setUser({
  //           uid: uid,
  //           displayName: displayName,
  //           email: mail,
  //           photoURL: photoURL,
  //         }))
  //       }
  //       else{
  //         dispatch(appActions.setUser({}))
  //       }
  //   })
  // })
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
