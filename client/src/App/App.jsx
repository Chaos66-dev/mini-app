// import { useState } from 'react'
import './App.css'
import MovieCard from '../MovieCard/MovieCard.jsx'

function App() {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  return (
    <div className='app-wrapper'>
      <div className='header'>
        <div>
          Logo here
        </div>
        <div className="title">
          My Movies Mini App
        </div>
        <div className="links">
          Links Here
        </div>
      </div>
      <div className='main'>
        <div className='movie-card-container'>

          {movies.map((mov, k) => <MovieCard key={k} movie={mov} />)}
        </div>
      </div>
    </div>
  )
}

export default App
