import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import FilterMoviesCard from '../components/filterMoviesCard';

const HomePage = () => {
  const [filter, setFilter] = React.useState({
    genre: '',
    year: '',
    rating: ''
  });

  const onUserInput = (type, value) => {
    setFilter({ ...filter, [type]: value });
  };

  // const { data, error, isLoading, isError } = useQuery('discover', getMovies)
  const { data, error, isLoading, isError } = useQuery(
    ['discover', { ...filter }],
    () => getMovies(filter.genre, filter.year, filter.rating),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  console.log(data.results);

  // const movies = data.results;
  const movies = data?.results || [];

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
      <FilterMoviesCard
        onUserInput={onUserInput}
        genreFilter={filter.genre}
        yearFilter={filter.year}
        ratingFilter={filter.rating}
      />
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
          //<AddToWatchIcon movie={movie}/>
        }}
      />
    </>
  );
};
export default HomePage;