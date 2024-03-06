async function loadMovies() {
  console.log("===== LOADING MOVIES =====");
  const response = await fetch('/api/movies/random');
  const movies = await response.json();
  console.log("Movies loaded:", movies);

  const moviesContainer = document.querySelector('.movie-trivia');
  moviesContainer.innerHTML = ''; // Clear existing movies
  movies.forEach(movie => {
    console.log(movie);
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <button class="movie-select-btn" data-id="${movie.id}" data-year="${movie.releaseYear}">${movie.title}</button>
    `;
    moviesContainer.appendChild(movieElement);
  });

  // Add event listeners to movie buttons
  document.querySelectorAll('.movie-select-btn').forEach(button => {
    button.addEventListener('click', selectMovie);
  });
}


// Function to handle movie selection. This function will be called when a movie button is clicked. 
async function selectMovie(event) {
  const selectedMovieId = event.target.getAttribute('data-id');
  const selectedMovieYear = parseInt(event.target.getAttribute('data-year'), 10);

  // Fetch the other movie's year for comparison
  const otherMovieButton = [...document.querySelectorAll('.movie-select-btn')]
    .find(button => button.getAttribute('data-id') !== selectedMovieId);
  const otherMovieYear = parseInt(otherMovieButton.getAttribute('data-year'), 10);

  console.log("Selected Movie Year:", selectedMovieYear);
  console.log("Other Movie Year:", otherMovieYear);

  if (selectedMovieYear <= otherMovieYear) {
    alert('Correct! Loading new movies...');
    loadMovies(); // Reload new movies
  } else {
    alert('Wrong! Game over. Your score was: [Your Score Here]');
    loadMovies(); // Start a new game
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startGameBtn = document.getElementById('start-game-btn');
  startGameBtn.addEventListener('click', loadMovies);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.movie-trivia').addEventListener('click', (event) => {
    if (event.target.classList.contains('movie-select-btn')) {
      selectMovie(event);
    }
  });
});