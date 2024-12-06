import { useEffect, useState,createContext } from 'react'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import axiosBase from './axiosConfig'
import { useNavigate } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
export const AppState=createContext();

function App() {
  const [user,setUser]=useState()
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  async function checkUser() {
    try {
      const {data}=await axiosBase.get('/users/check',{
        headers:{
          Authorization:'Bearer '+ token,
        },
      })
      setUser(data);
      
    } catch (error) {
      console.log(error.response);
      navigate('/login');


      
    }
    
  }

  useEffect(() => {
    
   checkUser();
  }, []);
  console.log(user);

  return (
    <AppState.Provider value={{user,setUser}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer/>
    </AppState.Provider>
  );
}

export default App
