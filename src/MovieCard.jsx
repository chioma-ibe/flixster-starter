import React from 'react'

function MovieCard({ title, posterImg, voteAverage }) {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <img className="poster" src={`${imgBaseUrl}${posterImg}`} alt={`${title} poster`} />
      <p className="vote-average">Rating: {voteAverage.toFixed(1)}</p>
    </div>
  )
}

export default MovieCard
