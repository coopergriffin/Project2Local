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
}

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
    // Increment score and update display
    updateScore(true);
    loadMovies(); // Reload new movies
  } else {
    // Update display with final score before resetting
    updateScore(false);
    alert(`Wrong! Game over. Your score was: ${document.getElementById('current-score').textContent}`);
    // Reset score and load new movies
    loadMovies(); // Start a new game
  }
}

function updateScore(correct) {
  // This function should be implemented to update the score on the server-side
  // and then fetch the updated score and highscore to update the UI.
  // Placeholder implementation:
  let currentScore = parseInt(document.getElementById('current-score').textContent) || 0;;
  if (correct) {
    currentScore += 1; // Increment score
  } else {
    currentScore = 0; // Reset score
  }
  document.getElementById('current-score').textContent = currentScore.toString();
  // Fetch and update highscore as needed
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