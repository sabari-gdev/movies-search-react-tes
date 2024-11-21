import { FC } from "react";

import "./style.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMoviesByTitle, setSearchMovieTitle } from "../slice/movieSlice";

const TopBar: FC = () => {
  const appDispatch = useAppDispatch();
  const title = useAppSelector((state) => state.movies.movieTitle);

  return (
    <div className="top-bar-container">
      <h3>MovieSearch.com</h3>

      <div className="movies-search-input-container">
        <input
          className="movies-search-input"
          onChange={(e) => {
            appDispatch(setSearchMovieTitle(e.target.value));
          }}
        />
        <button
          className="movies-search-button"
          onClick={() => {
            appDispatch(fetchMoviesByTitle(title));
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TopBar;
