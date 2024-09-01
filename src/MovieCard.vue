<script setup>
defineEmits(['select', 'unselect']);
defineProps(['movie', 'selected']);

const DEFAULT_POSTER = 'https://placehold.co/360x270/?text=no%20preview';
</script>

<template>
  <div
    data-cy="movie"
    class="card"
    :class="{ 'has-background-grey': selected }"
  >
    <header class="card-header is-justify-content-space-between">
      <button
        v-if="selected"
        class="card-header-icon"
        data-cy="movie__unselect-button"
        @click="$emit('unselect')"
      >
        <span class="icon">
          <i class="fas fa-minus"></i>
        </span>
      </button>

      <button
        v-else
        class="card-header-icon"
        data-cy="movie__select-button"
        @click="$emit('select')"
      >
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
      </button>
    </header>

    <div class="card-image">
      <figure class="image is-4by3">
        <img
          data-cy="movie__image"
          :src="movie.imgUrl === 'N/A' ? DEFAULT_POSTER : movie.imgUrl"
          :alt="movie.title"
        />
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="./assets/images/imdb-logo.jpeg" alt="imdb" />
          </figure>
        </div>

        <div class="media-content">
          <p class="title is-8" data-cy="movie__title">{{ movie.title }}</p>
        </div>
      </div>

      <div class="content">
        <p data-cy="movie__description">{{ movie.description }}</p>
        <a :href="movie.imdbUrl" data-cy="movie__link">IMDB</a>
      </div>
    </div>
  </div>
</template>
