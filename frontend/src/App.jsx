import { useState, useEffect, useCallback } from 'react'
import HomePage from './pages/HomePage'
import { AppProvider } from './context/AppContext'
import { api } from './services/api'

function App() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App