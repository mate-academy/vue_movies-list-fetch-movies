<script setup>
import MovieCard from './MovieCard.vue';

defineEmits(['select', 'unselect']);
defineProps(['movies', 'isSelected']);
</script>

<template>
  <TransitionGroup tag="div" class="movies" name="movie-list">
    <MovieCard
      v-for="movie of movies"
      :key="movie.imdbId"
      :movie="movie"
      :selected="isSelected(movie)"
      @select="$emit('select', movie)"
      @unselect="$emit('unselect', movie)"
    />
  </TransitionGroup>
</template>

<style scoped>
.movie-list-enter-active,
.movie-list-leave-active {
  transition: all 0.3s ease;
}
.movie-list-enter-from,
.movie-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
