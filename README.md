# react-assignment


## /discover/movie static endpoint

1.  Define an API call function of a new static endpoint /lastest in tmdb-api.js

1.  A new static endpoint /latest added.

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




    


