import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getLatestMovies } from "../api/tmdb-api"; 
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch'; 

const LatestMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery("latest", getLatestMovies); 

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }

    const movies = data.results; 
    const mustWatch = movies.filter(m => m.mustWatch);


    localStorage.setItem('favorites', JSON.stringify(mustWatch));

    return (
        <PageTemplate
            title="Latest Movies" 
            movies={movies}
            action={movie => {
                return <AddToMustWatchIcon movie={ movie }/>
            }}
        />
    );
};

export default LatestMoviesPage;