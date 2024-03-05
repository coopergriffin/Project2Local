async function loadMovies() {
  const response = await fetch('/api/movies/random');
  const movies = await response.json();
  // Example of how to display movies - adjust according to your actual HTML structure
  const moviesContainer = document.querySelector('.movie-trivia');
  moviesContainer.innerHTML = ''; // Clear existing movies
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.name}">
      <button class="movie-select-btn" data-id="${movie.id}">${movie.name}</button>
    `;
    moviesContainer.appendChild(movieElement);
  });
}
document.addEventListener('DOMContentLoaded', loadMovies);