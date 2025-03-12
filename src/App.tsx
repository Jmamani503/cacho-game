import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Game from './components/Game'
import GameGuard from './guards/GameGuard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/game' element={<GameGuard><Game/></GameGuard>}/>
        <Route path='*' element={<Navigate to={'/home'}/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
