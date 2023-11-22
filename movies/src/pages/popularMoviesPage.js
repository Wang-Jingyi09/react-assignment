import React from "react";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const PopularMoviesPage = () => {
    const { data, isLoading, isError, error } = useQuery('popularMovies', getPopularMovies);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }
    const movies = data?.results || [];
    const mustWatch = movies.filter(m => m.mustWatch);


    localStorage.setItem('favorites', JSON.stringify(mustWatch));
    return (
        <PageTemplate
            title="Popular Movies"
            movies={movies}
            action={movie => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default PopularMoviesPage;
