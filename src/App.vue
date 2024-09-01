<template>
  <div class="page">
    <div class="page-content">
      <h1 class="title">Movies List</h1>

      <form class="box" data-cy="search">
        <div class="field">
          <label for="search-query" class="label">Search movie</label>

          <div class="control has-icons-left has-icons-right">
            <input
              type="search"
              data-cy="search__field"
              id="search-query"
              class="input is-danger"
              placeholder="Type search word"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </div>

          <p class="help is-danger" data-cy="search__error">Error message</p>
        </div>

        <div class="buttons">
          <button
            data-cy="search__submit-button"
            type="submit"
            class="button is-link is-loading"
          >
            Search
          </button>

          <button
            data-cy="search__clear-button"
            type="reset"
            class="button is-light"
            disabled
          >
            Clear
          </button>
        </div>
      </form>

      <!-- MovieList -->
    </div>

    <div class="sidebar content">
      <h2 class="title is-4">My Collection</h2>

      <ul>
        <li data-cy="selected-movie">
          <strong data-cy="selected-movie__title">Movie 1</strong>

          <button data-cy="selected-movie__delete-button">
            <span class="icon has-text-danger">
              <i class="fas fa-xmark"></i>
            </span>
          </button>
        </li>

        <li data-cy="selected-movie">
          <strong data-cy="selected-movie__title">Movie 2</strong>

          <button data-cy="selected-movie__delete-button">
            <span class="icon has-text-danger">
              <i class="fas fa-xmark"></i>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
