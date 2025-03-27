import './MovieCard.css'
import { useState } from 'react'

function MovieCard({ movie, movies, setMovies }) {
    const [watched, setWatched] = useState(movie.watched || false)

    function handleToggleWatched() {
        const newWatched = !watched
        setWatched(newWatched)
        fetch(`http://localhost:8081/movies`, {
        method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: movie.id,
                watched: newWatched
            })
        })
            .then(res => res.json())
            .then(data => setMovies(movies.map((mov) => {
                if (mov.id == movie.id) {
                    return data.data[0]
                } else {
                    return mov
                }
            })))
    }


    return (
        <div className='movie-card-wrapper'>
            <h1>
                {movie.title}
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ducimus.
            </p>
            <div className="watched-wrapper">
                <input
                type="checkbox"
                checked={watched}
                onChange={handleToggleWatched}
                />
                <label>{watched ? "Watched" : "Not Watched"}</label>
            </div>
        </div>
    )
}

export default MovieCard