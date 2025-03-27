import './MovieCard.css'

function MovieCard({ movie }) {


    return (
        <div className='movie-card-wrapper'>
            <h1>
                {movie.title}
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ducimus.
            </p>
        </div>
    )
}

export default MovieCard