import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import {UserContextProvider} from "./UserContext.jsx";
axios.defaults.baseURL  = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {


  return (
      <UserContextProvider>
          <Routes>
              <Route path = "/" element = {<Layout />}>
                  <Route index-element = {<IndexPage/>} />
                  <Route path = "/login" element = {<LoginPage/>}/>
                  <Route path = "/register" element = {<RegisterPage/>}/>

              </Route>
          </Routes>
      </UserContextProvider>
  )
}

export default App
