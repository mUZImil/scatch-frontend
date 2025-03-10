import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

export default function RoutesFile() {
  return (

       <BrowserRouter>
          <Routes>
           <Route path='/' element={<Login />} />
           <Route path='/register' element={<Register />} />
          </Routes>
       </BrowserRouter>

  )
}
