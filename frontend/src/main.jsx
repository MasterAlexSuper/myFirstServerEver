import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import { Login } from './pages/Login.jsx';
import { Registration } from './pages/Registration.jsx';
import { UserPage } from './pages/UserPage.jsx';
import { EditPage } from './pages/EditPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/:id' element={<UserPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
