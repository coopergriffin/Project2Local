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
      <img class="movie-poster" src="${movie.imageURL}" alt="${movie.title}">
      <button class="movie-select-btn" data-id="${movie.id}" data-year="${movie.releaseYear}">${movie.title}</button>
    `;
    moviesContainer.appendChild(movieElement);
  });
}

async function selectMovie(event) {
  const selectedMovieId = event.target.getAttribute('data-id');
  const selectedMovieYear = parseInt(event.target.getAttribute('data-year'), 10);

  const otherMovieButton = [...document.querySelectorAll('.movie-select-btn')]
    .find(button => button.getAttribute('data-id') !== selectedMovieId);
  const otherMovieYear = parseInt(otherMovieButton.getAttribute('data-year'), 10);

  console.log("Selected Movie Year:", selectedMovieYear);
  console.log("Other Movie Year:", otherMovieYear);

  if (selectedMovieYear <= otherMovieYear) {
    alert('Correct! Loading new movies...');
    updateScore(true);
    loadMovies(); // Reload new movies
  } else {
    const currentScore = parseInt(document.getElementById('current-score').textContent) || 0;
    alert(`Wrong! Game over. Your score was: ${currentScore}`);
    updateScore(false);
    loadMovies(); // Start a new game
  }
}

async function updateScore(correct) {
  let currentScore = parseInt(document.getElementById('current-score').textContent) || 0;
  if (correct) {
    currentScore += 1; // Increment score
  } else {
    currentScore = 0; // Reset score
  }
  document.getElementById('current-score').textContent = currentScore.toString();

  // Fetch and update highscore as needed
  const response = await fetch('/api/users/submit', { // Updated endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correct, currentScore }),
  });
  const data = await response.json();
  if (data.highScore) {
    document.getElementById('high-score').textContent = `${data.highScore}`;
  }
}

async function fetchAndDisplayHighscore() {
  const response = await fetch('/api/users/highscore');
  console.log("Response from /api/users/highscore:", response); // Log the response object
  const data = await response.json();
  console.log("Data received from /api/users/highscore:", data); // Log the parsed data
  if (data.highScore) {
    document.getElementById('high-score').textContent = `${data.highScore}`;
  } else {
    console.log("Highscore not found in the response data"); // Log if highScore is not present
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayHighscore();
  const startGameBtn = document.getElementById('start-game-btn');
  startGameBtn.addEventListener('click', () => {

    document.getElementById('current-score').textContent = '0'; // Reset score to 0

    loadMovies();

  });

  document.querySelector('.movie-trivia').addEventListener('click', (event) => {
    if (event.target.classList.contains('movie-select-btn')) {
      selectMovie(event);
    }
  });
});