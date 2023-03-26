import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import Home from './components/Home'
import JobDetails from './components/JobDetails'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function App () {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='App'>
        <Header setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path='/' element={<Home searchQuery={searchQuery} />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='*' element={<p>Page Not Found</p>} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}
