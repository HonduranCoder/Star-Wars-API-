import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  function fetchMovie() {
    setIsLoading(true);
    setError(null);
    fetch('https://swapi.dev/api/films/')
      .then((response) => {
        return response.json();
      })
      .catch(error)
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p> No Movies. </p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>Error</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
