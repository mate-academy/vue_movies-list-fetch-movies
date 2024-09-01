import axios from 'axios';

const API_KEY = '2f4a38c9';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const mapMovieResponse = m => ({
  imdbId: m.imdbID,
  title: m.Title,
  description: `${m.Year} - ${m.Type}`,
  imgUrl: m.Poster,
  imdbUrl: `https://www.imdb.com/title/${m.imdbID}`,
});

export async function getMoviesByQuery(query) {
  const url = BASE_URL + `&s=${query.toLowerCase()}`;
  const { data } = await axios.get(url);

  if (data.Response === 'False') {
    throw new Error(data.Error);
  }

  return data.Search.map(mapMovieResponse);
}
