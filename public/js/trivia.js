async function loadMovies() {
  console.log("===== LOADING MOVIES =====");
  const response = await fetch('/api/movies/random');
  const movies = await response.json();
  console.log("Movies loaded:", movies);
  
  // Example of how to display movies - adjust according to your actual HTML structure
  const moviesContainer = document.querySelector('.movie-trivia');
  moviesContainer.innerHTML = ''; // Clear existing movies
  movies.forEach(movie => {
    console.log(movie);
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <button class="movie-select-btn" data-id="${movie.id}">${movie.title}</button>
    `;
    moviesContainer.appendChild(movieElement);
  });
}
document.addEventListener('DOMContentLoaded', loadMovies);

document.addEventListener('DOMContentLoaded', () => {

  const startGameBtn = document.getElementById('start-game-btn');

  startGameBtn.addEventListener('click', () => {

    loadMovies(); // Or any other function that starts the game

  });

});