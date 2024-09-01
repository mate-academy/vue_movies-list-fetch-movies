<script setup>
import { ref } from 'vue';
import { getMoviesByQuery } from './api';

const emit = defineEmits(['found']);
const query = ref('');
const errorMessage = ref('');
const loading = ref(false);

async function loadMovies() {
  try {
    loading.value = true;
    const movies = await getMoviesByQuery(query.value);

    emit('found', movies);
  } catch (error) {
    errorMessage.value = error.message;
    emit('found', []);
  } finally {
    loading.value = false;
  }
}

function clear() {
  query.value = '';
  errorMessage.value = '';
  emit('found', []);
}
</script>

<template>
  <form
    class="box"
    data-cy="search"
    @submit.prevent="loadMovies"
    @reset="clear"
  >
    <div class="field">
      <label for="search-query" class="label">Search movie</label>

      <div
        class="control has-icons-left"
        :class="{ 'has-icons-right': errorMessage }"
      >
        <input
          type="search"
          data-cy="search__field"
          id="search-query"
          class="input"
          :class="{ 'is-danger': errorMessage }"
          placeholder="Type search word"
          v-model.trim="query"
          :disabled="loading"
          @input="errorMessage = ''"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
        <span class="icon is-small is-right" v-if="errorMessage">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>

      <p v-if="errorMessage" class="help is-danger" data-cy="search__error">
        {{ errorMessage }}
      </p>
    </div>

    <div class="buttons">
      <button
        data-cy="search__submit-button"
        type="submit"
        class="button is-link"
        :class="{ 'is-loading': loading }"
        :disabled="!query || loading"
      >
        Search
      </button>

      <button
        data-cy="search__clear-button"
        type="reset"
        class="button is-light"
        :disabled="!query || loading"
      >
        Clear
      </button>
    </div>
  </form>
</template>
