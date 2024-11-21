import { FC, useEffect, useState } from "react";

import TopBar from "./components/TopBar";

import { useAppDispatch, useAppSelector } from "./app/hooks";

import { fetchMoviesByTitle } from "./slice/movieSlice";

import "./index.css";

export const useDebouncedSearchTitle = (title: string, delay: number) => {
  const [searchTitle, setSearchTitle] = useState(title);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setSearchTitle(title);
    }, delay);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [title, delay]);

  return searchTitle;
};

const App: FC = () => {
  const appDispatch = useAppDispatch();
  const state = useAppSelector((state) => state.movies);

  const debouncedSearchTerm = useDebouncedSearchTitle(state.movieTitle, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== "")
      appDispatch(fetchMoviesByTitle(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <div className="main-body-container">
      <TopBar />

      {!state.isMoviesListingFailed && (
        <div>
          <p>Movies found: {state.movies.length}</p>
          {!state.isMoviesListingFailed &&
            state.movies.map((movie, index) => (
              <div key={index} style={{ display: "flex" }}>
                <img className="movie-card-poster" src={movie.Poster} />
                <div>
                  <h5>{movie.Title}</h5>
                  <p>
                    {movie.Released} • {movie.Genre} • {movie.Language} •{" "}
                    {movie.Released} • {movie.Runtime}
                  </p>
                  <p>{movie.Plot}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {state.isMoviesListingFailed && (
        <p>Error occured while fetching movies</p>
      )}

      {state.isMoviesListLoading && <p>Fetching movie details...</p>}
    </div>
  );
};

export default App;
