# react-assignment


## /discover/movie static endpoint

1.  Define an API call function of a new static endpoint /lastest in tmdb-api.js

1.  A new static endpoint /latest added. (It has been modified as /discover/movie endpoint.)

1.  Create a new React page component to use API calls.

1.  Update Route path.
    
1.  Update site header label and path to show latest movies page.
    Then I met an error:"TypeError: Cannot read properties of undefined (reading 'filter')" in latestMoviesPage.js. It is because that we suppose "const movies = data.results;" is always true. However, 'data' can be 'undefined'. we should make sure that 'movies' is an array which has been defined before calling filter method. Solution: const movies = data?.results || []; 

1.  Then I met another problem: The web server displays nothing but a filter. It because I use the /latest   endpoint, which means showing just one latest movie. What I want to show is the list of multiple latest movies. Therefore, I update the endpoint '/discover/movie', and then sort them in descending order of time, and filter no later than the current date.



## add parameterised endpoint /movie/:id/credits

1. Define the API Function to make a fetch request to TMDB API with an identifier id.

1. Use Router for dynamic routing which can handle variable paths.

1. use 'useParams' hook from Router to access the dynamic parameter id.

1. Fetch data of movie cast message through API calling with 'useQuery' hook form React Query.


## add a static endpoint /movie/popular
 
 1. Define a API functioin in src/api/tmdb-api.js to get the list of movies sorted from highest to lowest rating.

 1. Use useQuery hook to call 'getPopularMovies' function, and handle the returned data in pages/popularMoviesPage.js

 1. Add a route in src/index.js to point to the new popular movie page.

 1. Update the site header to create a new page to display popular moves list sorted by rating.

 1. I meet a problem that is the page is not sorted by rating and looks the same as the home page. Then I find that the static endpoint '/movie/popular' may not support the 'sort_by' parameter, and it just sorts the movies by default order. Finally, I use '/discover/movie' endpoint to show the page.

## Advanced search and filter by release year and rating.

1. Update the API function 'getMovies' in tmdb-api.js to accept the year and rating parameters, setting filter ranges and build the API request URL, dynamically concatenating the query string accordingly.

1. Update the 'filterMoviesCard' component to add a new textFields and a form control for filtering year and rating.Here I move the 'handleChange' function into templateMovieListPage.js. The state of all filters (including year and score) is passed in by props, as is the onUserInput function. They will be called when the user changes the filter. So FilterMoviesCard component is responsible for displaying only filter UI, and inform the templateMovieListPage/index js filter condition changes.

1. Update 'templateMovieListPage.js'. Add the corresponding filter conditions for filtering releaseYear and selectedRating.
Update the handleChange function, which needs to be able to update the state of these new filters.

1. Update 'homePage.js' to process the filterMoviesCard input and update the status. UseQuery can correctly call the 'getMovies' function from 'tmdb-api.js'


## add a new endpoint /trending

1. Add a new API function of a static endpoint /trending/movie/week to acquire trending movie list weekly.

1. Use the useQuery hook and the getTrendingMovies function to request trending movie data from the API. When the component is re-rendered, the data is updated weekly according to what I set in 'staleTime'. Handling load state and error state. If the request is in progress, it displays a load indicator ('Spinner'). If the request goes wrong, it displays an error message.The obtained movie data is stored in the movies variable and passed to the MovieListPageTemplate component for rendering.For each movie, I provide two actions: Add to 'Favorites' and add to 'MustWatch'. Use 'localStorage' to store movies that are marked as must watch.

1. Add a route in src/index.js to point to the new trending movie page.




    


