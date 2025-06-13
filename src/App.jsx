import React from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
      </header>
      <MovieList />
      <footer className='App-footer'>
        <h3> © 2025 Flixter inc</h3>
      </footer>
    </div>
  )
}

export default App
