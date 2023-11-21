# react-assignment

1.  Define an API call function of a new static endpoint /lastest in tmdb-api.js
    A new static endpoint /latest added.
    Create a new React page component to use API calls.
    Update Route path.
    
    Update site header label and path to show latest movies page.
    Then I met an error:"TypeError: Cannot read properties of undefined (reading 'filter')" in latestMoviesPage.js. It is because that we suppose "const movies = data.results;" is always true. However, 'data' can be 'undefined'. we should make sure that 'movies' is an array which has been defined before calling filter method. Solution: const movies = data?.results || []; 


