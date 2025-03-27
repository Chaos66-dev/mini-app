import { useState, useEffect } from 'react'
import './App.css'
import MovieCard from '../MovieCard/MovieCard.jsx'

function App() {
  const [movies, setMovies] = useState([])
  const [crudText, setCrudText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [view, setView] = useState('home')

  useEffect(() => {
    fetch('http://localhost:8081/movies')
        .then(res => res.json())
        .then(data => {
          setMovies(data)
        })
  }, [])

  function toggleView() {
    if (view == 'home') {
      setView('watched')
    } else if (view == 'watched') {
      setView('home')
    } else {
      setView('home')
    }
  }

  function handleSearch(event){
      setSearchText(event.target.value)
  }

  function handleCrud(event){
      setCrudText(event.target.value)
  }

  function handleAdd(){
    if(crudText != '') {
      fetch('http://localhost:8081/movies', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: crudText
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies([...movies, data.movie[0]])
      })
      .catch(error => console.error('Error:', error));
    }
  }

  function handleDelete(){
    if(crudText != '') {
      fetch(`http://localhost:8081/movies`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: crudText
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies([...data.message])
      })
    }
  }

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
        <div className="main-util">
          <div className="crud-fields">
            <input type="text"
                    placeholder="Movie Title..."
                    value={crudText}
                    onChange={handleCrud}
                     />
            <button type="submit"
                    onClick={handleAdd}>
              Add
            </button>
            <button type="submit"
                    onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className='search-bar'>
              <input type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={handleSearch}/>
          </div>
          <div className='my-watched'>
            <button type="submit"
                    onClick={toggleView}>
                      My Watched
            </button>
          </div>
        </div>
        <div className='movie-card-container'>
        {view === 'home'
              ? movies?.filter((mov) => mov.title.toLowerCase().includes(searchText))
                        .map((mov, k) => <MovieCard key={k} movie={mov} movies={movies} setMovies={setMovies} />)
        : view === 'watched'
              ? movies?.filter((mov) => mov.title.toLowerCase().includes(searchText))
                        .map((mov, k) => {
                          if (mov.watched == true) {
                            return <MovieCard key={k} movie={mov} movies={movies} setMovies={setMovies}/>
                          }
                        })
        : null
        }
        </div>
      </div>
    </div>
  )
}

export default App
