<script setup>
import { ref } from 'vue';
import MovieList from './MovieList.vue';
import FindMovies from './FindMovies.vue';

const foundMovies = ref([]);
const selectedMovies = ref([]);

function selectMovie(movie) {
  if (!isMovieSelected(movie)) {
    selectedMovies.value.push(movie);
  }
}

function unselectMovie(movie) {
  selectedMovies.value = selectedMovies.value.filter(
    m => m.imdbId !== movie.imdbId,
  );
}

function isMovieSelected(movie) {
  return selectedMovies.value.includes(movie);
}
</script>

<template>
  <div class="page">
    <div class="page-content">
      <h1 class="title">Movies List</h1>

      <FindMovies @found="foundMovies = $event" />

      <MovieList
        :movies="foundMovies"
        :isSelected="isMovieSelected"
        @select="selectMovie"
        @unselect="unselectMovie"
      />
    </div>

    <div class="sidebar content">
      <h2 class="title is-4">My Collection</h2>

      <ul>
        <li
          v-for="movie of selectedMovies"
          :key="movie.imdbId"
          data-cy="selected-movie"
        >
          <strong data-cy="selected-movie__title">{{ movie.title }}</strong>

          <button
            data-cy="selected-movie__delete-button"
            @click="unselectMovie(movie)"
          >
            <span class="icon has-text-danger">
              <i class="fas fa-xmark"></i>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
