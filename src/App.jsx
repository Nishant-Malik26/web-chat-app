// import { useState } from 'react'
import './App.css'
import React from 'react'
import AuthenticatedUserPages from './pages/AuthenticatedUserPages.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {
     true && <AuthenticatedUserPages/>     
    }
    </>
  )
}

export default App
