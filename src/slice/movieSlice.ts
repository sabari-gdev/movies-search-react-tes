import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IMovie } from "../interfaces/movies";

interface IMovieState {
  movies: IMovie[];
  isMoviesListLoading: boolean;
  isMoviesListingFailed: boolean;
  movieTitle: string;
}

const initialState: IMovieState = {
  movies: [],
  isMoviesListLoading: false,
  isMoviesListingFailed: false,
  movieTitle: "",
};

export const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setSearchMovieTitle: (state, action) => {
      state.movieTitle = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByTitle.pending, (state) => {
        state.isMoviesListLoading = true;
        state.isMoviesListingFailed = false;
      })
      .addCase(fetchMoviesByTitle.fulfilled, (state, action) => {
        state.isMoviesListLoading = false;
        state.movies = [action.payload];
      })
      .addCase(fetchMoviesByTitle.rejected, (state) => {
        state.isMoviesListLoading = false;
        state.isMoviesListingFailed = true;
        state.movies = [];
      });
  },
});

export const fetchMoviesByTitle = createAsyncThunk(
  "movies/byTitle",
  async (title: string, thunkAPI) => {
    try {
      return fetch(`https://www.omdbapi.com/?apikey=d3bd536a&t=${title}`)
        .then((resp) => resp.json())
        .then((repos) => {
          return repos;
        })
        .catch((ex) => {
          console.error(ex);
        });
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const { setSearchMovieTitle } = movieSlice.actions;

export default movieSlice.reducer;
