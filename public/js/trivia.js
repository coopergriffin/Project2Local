// public/js/trivia.js
async function loadMovies() {
    const response = await fetch('/api/movies/random');
    const movies = await response.json();
    // Display movies in the UI
  }
  
  document.addEventListener('DOMContentLoaded', loadMovies);