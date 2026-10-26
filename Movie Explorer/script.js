const API_KEY = "12012f4d";
const API_BASE = "https://www.omdbapi.com/";

/* ============================================
   UTILS — DEBOUNCE
   ============================================ */
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/* ============================================
   API LAYER
   ============================================ */
async function searchMovies(query, signal) {
  const url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error(`Network error (${response.status})`);
    error.type = "http";
    throw error;
  }

  const data = await response.json();

  if (data.Response === "False") {
    const error = new Error(data.Error);
    error.type = "api";
    throw error;
  }

  return data.Search;
}

async function getMovieDetails(imdbID) {
  const url = `${API_BASE}?apikey=${API_KEY}&i=${imdbID}`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(`Network error (${response.status})`);
    error.type = "http";
    throw error;
  }

  const data = await response.json();

  if (data.Response === "False") {
    const error = new Error(data.Error);
    error.type = "api";
    throw error;
  }

  return data;
}

/* ============================================
   DOM REFERENCES
   ============================================ */
const statusEl = document.getElementById("status");
const statusMessage = document.getElementById("status-message");
const grid = document.getElementById("movie-grid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

/* ============================================
   UI — STATUS
   ============================================ */
function showLoading() {
  statusEl.classList.remove("hidden");
  statusMessage.innerHTML = `
    <div class="spinner"></div>
    <p>Searching...</p>
  `;
}

function showMessage(text) {
  statusEl.classList.remove("hidden");
  statusMessage.innerText = text;
}

function showEmpty(query) {
  statusEl.classList.remove("hidden");
  statusMessage.innerHTML = `
    <div class="status-message empty">
      <span class="icon">🎬</span>
      <h3 class="title">No movies found</h3>
      <p class="hint">
        We couldn't find anything for "<strong>${query}</strong>".
        Try a different keyword.
      </p>
    </div>
  `;
}

function showHint(text) {
  statusEl.classList.remove("hidden");
  statusMessage.innerHTML = `
    <div class="status-message hint">
      <span class="icon">💡</span>
      <h3 class="title">Too many results</h3>
      <p class="hint">${text}</p>
    </div>
  `;
}

function clearStatus() {
  statusEl.classList.add("hidden");
  statusMessage.textContent = "";
}

/* ============================================
   UI — MOVIE GRID
   ============================================ */
function renderMovies(movies) {
  grid.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.dataset.imdbId = movie.imdbID;

    const posterSrc =
      movie.Poster === "N/A"
        ? "https://placehold.co/300x450/1f1f1f/f5c518?text=No+Poster"
        : movie.Poster;

    card.innerHTML = `
      <div class="movie-poster">
        <img src="${posterSrc}" alt="${movie.Title}" />
      </div>
      <div class="movie-info">
        <span class="movie-type">${movie.Type}</span>
        <h3 class="movie-title">${movie.Title}</h3>
        <p class="movie-year">${movie.Year}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ============================================
   UI — MODAL
   ============================================ */
function openModal(movie) {
  const safe = (val) => (val === "N/A" || !val ? "—" : val);

  const posterSrc =
    movie.Poster === "N/A"
      ? "https://placehold.co/600x400/1f1f1f/f5c518?text=No+Poster"
      : movie.Poster;

  const genres = safe(movie.Genre)
    .split(", ")
    .map((g) => `<span class="modal-badge">${g}</span>`)
    .join("");

  modalBody.innerHTML = `
    <div class="modal-poster">
      <img src="${posterSrc}" alt="${movie.Title}" />
    </div>
    <div class="modal-info">
      <div class="modal-header">
        <h2 class="modal-title">${movie.Title}</h2>
        <div class="modal-meta">
          <span>${movie.Year}</span>
          <span class="sep">•</span>
          <span>${safe(movie.Runtime)}</span>
          <span class="sep">•</span>
          <span>${safe(movie.Rated)}</span>
        </div>
      </div>

      <div class="modal-director">
        <strong>Director:</strong> ${safe(movie.Director)}
      </div>

      <div class="modal-row">
        <span class="label">Actors</span>
        <span class="value">${safe(movie.Actors)}</span>
      </div>

      <div class="modal-badges">
        <span class="modal-badge rating">${safe(movie.imdbRating)}</span>
        ${genres}
      </div>

      <p class="modal-plot">${safe(movie.Plot)}</p>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modalBody.innerHTML = "";
  document.body.style.overflow = "";
}

function showModalLoading() {
  modalBody.innerHTML = `
    <div class="status-message" style="padding: 6rem 2rem;">
      <div class="spinner"></div>
      <p>Loading details...</p>
    </div>
  `;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

async function handleCardClick(imdbID) {
  showModalLoading();
  try {
    const movie = await getMovieDetails(imdbID);
    openModal(movie);
  } catch (err) {
    console.error(err);
    closeModal();
    showMessage("Failed to load movie details.");
  }
}

/* ============================================
   APP LOGIC — SEARCH (با AbortController)
   ============================================ */
let currentController = null;

async function handleSearch(query) {
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();

  showLoading();
  try {
    const movies = await searchMovies(query, currentController.signal);
    clearStatus();
    renderMovies(movies);
  } catch (err) {
    if (err.name === "AbortError") return;

    grid.innerHTML = "";

    if (err.type === "http") {
      showMessage("Network error. Please try again.");
      return;
    }

    // err.type === "api"
    if (err.message === "Movie not found!") {
      showEmpty(query);
    } else if (err.message === "Too many results.") {
      showHint("Please be more specific with your search.");
    } else {
      showMessage(err.message);
    }
  }
}

/* ============================================
   EVENT LISTENERS
   ============================================ */

// فرم Hero
const form = document.getElementById("hero-search-form");
const heroSearchInput = document.getElementById("hero-search-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = heroSearchInput.value.trim();
  if (!query) return;
  handleSearch(query);
});

// سرچ هدر
const headerSearchInput = document.getElementById("search-input");
const headerSearchBtn = document.getElementById("headerSearch");

headerSearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = headerSearchInput.value.trim();
  if (!query) return;
  handleSearch(query);
});

// Debounce روی تایپ هدر
const debouncedSearch = debounce(() => {
  const query = headerSearchInput.value.trim();
  if (query.length < 2) return;
  handleSearch(query);
}, 500);

headerSearchInput.addEventListener("input", debouncedSearch);

// کلیک روی کارت‌ها (Event Delegation)
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".movie-card");
  if (!card) return;
  const imdbID = card.dataset.imdbId;
  if (imdbID) handleCardClick(imdbID);
});

// بستن Modal — کلیک روی overlay یا close button
modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) {
    closeModal();
  }
});

// بستن Modal — با کلید Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
