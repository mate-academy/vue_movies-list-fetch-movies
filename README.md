# Movies list - Filter

Implement the `FindMovie` component to load movies from [OMDb API](http://www.omdbapi.com/) (You need to register and get an API key).

> Here is [the working version](https://mate-academy.github.io/vue_movies-list-fetch-movies/)

1. When a user enters a title and submits the form, send a request to `https://www.omdbapi.com/?apikey=<yourkey>&s=<query>`;
   - use the `getMoviesByQuery` method from the `api.js`. It shows the structure of the response.
1. Show a spinner on the submit button while waiting for the respose;
   - use `is-loading` class;
   - loading should be finished in any case (use `finally`);
1. If a movie is not found show an error message below the input;
   - also clear the list of movies;
   - hide it after changing the title;
1. If movies are found show them in the list;
   - Copy the `MovieList` component from your solution of [Vue Movies List](https://github.com/mate-academy/vue_movies-list-selector);
   - use [this imgUrl](https://placehold.co/360x270/?text=no%20preview) if a movie has no poster (`N/A` instead of `imgUrl`).
1. `Clear` button should clear the field and the list.
1. Disable buttons when `search__field` is empty or movies are loading.
1. The `+` button should **add** the movie to the list in the sidebar.
1. When movie is selected `-` button in the card and `x` button in the list should unselect it.
1. Don't add a movie to the list twice (compare by `imdbId`).



## Instructions

- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/vue_movies-list-fetch-movies/) and add it to the PR description.
