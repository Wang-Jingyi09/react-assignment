# Assignment1 - ReactJS app

Name: Jingyi Wang


## Overview

For extending the app, I realize three static endpoints, two parameterised endpoints, and links from movie detail pages to actor individual information pages.

For extending the functionality, caching with react-query is done on all static endpoints and parameterised endpoints. New filtering options(rating and release year) are added. Sorting and searching features and added(sorted by rating and release time).

For additional features, a new material UI components are included(movieRecommendations componenet). Responsive UI layout are realized. Pagination feature in upcoming page is integrated.

For documentation, I believe that I have a comprehensive readme file and a video with voiceover.


## Features.

+ Modify 'getMovies' API function to accept the year and rating parameters, setting filter ranges and build the API request URL, dynamically concatenating the query string accordingly.

+ The <Typography> layout component and Grid component of Material-UI are used for realizing a responsive layout.

+ When users click on an actor's name or character, they are redirected to that actor's TMDB page.

+ 'target="_blank"' and 'rel="noopener noreferrer"' are used to ensure open security of links.

+ Pagination realization for upComing page.



## Setup requirements

+  Setup remote Github repo.

+ Create a local repository and connect to Github

+ npm init to build node_modules.


## API endpoints.

+ Discover the latest movie list - /discover/movie (sort_by=release_date.desc&release_date.lte=${currentDate})

+ Discover top rated movie list - /movie/top_rated

+ Acquire trending movie list daily - /trending/movie/day

+ Show credits in movie details page - movie/:id/credits

+ Discover recommendation movies = movie/:id/recommendations


## Routing

+ /movies/latest - displays latest movie page sorted by release time.

+ /movies/:id/credits - lists actors in movie details page

+ /movies/top_rated - displays top rated movie list

+ /movies/trending - displays daily movie trend



## Below are all details of each steps I tried to expend the app, including some problems I met and how I solved them.

### /discover/movie static endpoint

1.  Define an API call function of a new static endpoint /lastest in tmdb-api.js

1.  A new static endpoint /latest added. (It has been modified as /discover/movie endpoint.)

1.  Create a new React page component to use API calls.

1.  Update Route path.
    
1.  Update site header label and path to show latest movies page.
    Then I met an error:"TypeError: Cannot read properties of undefined (reading 'filter')" in latestMoviesPage.js. It is because that we suppose "const movies = data.results;" is always true. However, 'data' can be 'undefined'. we should make sure that 'movies' is an array which has been defined before calling filter method. Solution: const movies = data?.results || []; 

1.  Then I met another problem: The web server displays nothing but a filter. It because I use the /latest   endpoint, which means showing just one latest movie. What I want to show is the list of multiple latest movies. Therefore, I update the endpoint '/discover/movie', and then sort them in descending order of time, and filter no later than the current date.



### add parameterised endpoint /movie/:id/credits

1. Define the API Function to make a fetch request to TMDB API with an identifier id.

1. Use Router for dynamic routing which can handle variable paths.

1. use 'useParams' hook from Router to access the dynamic parameter id.

1. Fetch data of movie cast message through API calling with 'useQuery' hook in movieCreditsPage.js to form React Query.

1. Use <Typography> layout component in 'movieDetails/index.js' to realize responsive UI layout.


### add a static endpoint /movie/top_rated
 
 1. Define a API functioin in src/api/tmdb-api.js to get the list of movies sorted from highest to lowest rating.

 1. Use useQuery hook to call 'getTopRatedMovies' function, and handle the returned data in pages/topRatedMoviesPage.js.

 1. Add a route in src/index.js to point to that  top rated movie page.

 1. Update the site header to create a new page to display top rated moves list.

 1. Initially, I use the static endpoint '/movie/popular' to display the movie list page sorted from highest rating to lowest. However, I meet a problem that is the page is not sorted by rating and looks the same as the home page. Then I find that the static endpoint '/movie/popular' may not support the 'sort_by' parameter, and it just sorts the movies by default order. Then, I use '/discover/top_rated' endpoint to show the page. This static endpoint from TMDB API is typically curated based on overall ratings and reviews from users, but it may not be strictly sorted by the highest ratings (like 10/10). Instead, it often factors in a combination of the average rating and the number of ratings a movie has received, which can provide a more balanced view of overall popularity and acclaim.

 1. There may be some movies that do not show movie posters, ratings or reviews. This is because TMDB data is not updated in a timely manner.

### Advanced search and filter by release year and rating.

1. Update the API function 'getMovies' in tmdb-api.js to accept the year and rating parameters, setting filter ranges and build the API request URL, dynamically concatenating the query string accordingly.

1. Update the 'filterMoviesCard' component to add a new textFields and a form control for filtering year and rating.Here I move the 'handleChange' function into templateMovieListPage.js. The state of all filters (including year and score) is passed in by props, as is the onUserInput function. They will be called when the user changes the filter. So FilterMoviesCard component is responsible for displaying only filter UI, and inform the templateMovieListPage/index js filter condition changes.

1. Update 'templateMovieListPage.js'. Add the corresponding filter conditions for filtering releaseYear and selectedRating.
Update the handleChange function, which needs to be able to update the state of these new filters. The Grid component of Material-UI is used for building a responsive layout. By setting different xs, sm, md, lg, and xl properties, we can specify the proportion of space that a component should occupy at different breakpoints.

1. Update 'homePage.js' to process the filterMoviesCard input and update the status. UseQuery can correctly call the 'getMovies' function from 'tmdb-api.js'


### add a new endpoint /trending

1. Add a new API function of a static endpoint /trending/movie/week to acquire trending movie list daily.

1. Use the useQuery hook and the getTrendingMovies function to request trending movie data from the API. When the component is re-rendered, the data is updated every day according to what I set in 'staleTime'. Handling load state and error state. If the request is in progress, it displays a load indicator ('Spinner'). If the request goes wrong, it displays an error message.The obtained movie data is stored in the movies variable and passed to the MovieListPageTemplate component for rendering.For each movie, I provide two actions: Add to 'Favorites' and add to 'MustWatch'. Use 'localStorage' to store movies that are marked as must watch.

1. Add a route in src/index.js to point to the new trending movie page.



### Pagination realization for upComing page.

1. Update getupComingMovies function in tmdb-api.js to receive a parameter 'page' with a default value '1' to build the requested URL. The default value of 1 means that if no page number is provided, the function will default to requesting data for the first page.

1. Modify the UpcomingMoviesPage component in upcomingMoviesPage.js to add paging function. Add a pagination control ( import Pagination from '@mui/material/Pagination';) to allow the user to change the page number. Add 'useState' to track the current page.


### Movie details page contains links to the actor's  individual information.

1. When users click on an actor's name or character, they are redirected to that actor's TMDB page. Wrap the entire "{member.name} as {member.character}" string with the <a> tag and set the href attribute to the URL pointing to the actor's information page. 'target="_blank"' and 'rel="noopener noreferrer"' are used to ensure open security of links.

### Add a new parametered endpoint /movie/:id/recommendations

1. Add an API function 'getMovieRecommendations' in tmdb-api.js. The recommendations for movies are based on the movie the user is currently viewing.

1. Create a 'movieRecommendations' component, using 'getMovieRecommendations' function and 'useQuery' hook to manage fetching, loading states, and error handling.

1. Update 'pages/movieDetailsPage.js to integrate the 'movieRecommendations' component within it. It uses the movie id from URL parameters to fetch movie details and pass the id to 'MovieRecommendations' component for fetching related movie recommendations.

1. After 'npm start', the web server shows an error: 'action is not a function'. Therefore, I check the action function in components/movieCard/index.js. There might be a call to action() without verifying if it's a function or not. Then, I modify this component to handle the absence of 'action':{action && typeof action === 'function' ? action(movie) : null}

