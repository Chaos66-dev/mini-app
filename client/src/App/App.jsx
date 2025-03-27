import { useState, useEffect } from 'react'
import './App.css'
import MovieCard from '../MovieCard/MovieCard.jsx'

function App() {
  const [movies, setMovies] = useState([])
  const [crudText, setCrudText] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetch('http://localhost:8081/movies')
        .then(res => res.json())
        .then(data => {
          setMovies(data)
        })
  }, [])

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
        </div>
        <div className='movie-card-container'>

          {movies?.filter((mov) => {
            if (mov.title.toLowerCase().includes(searchText)) return mov
          }).map((mov, k) => <MovieCard key={k} movie={mov}/>)}
        </div>
      </div>
    </div>
  )
}

export default App
