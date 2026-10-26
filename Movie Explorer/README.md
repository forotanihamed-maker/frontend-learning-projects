# 🎬 Movie Explorer

A movie and series search app powered by the **OMDb API**. Search for any title, browse the results as poster cards, and open a detailed view with cast, plot, genre, and IMDb rating.

## 📖 About

Movie Explorer is a practice project for learning how to work with a REST API using `fetch` and `async/await`, and how to handle loading, empty, and error states in the UI.

## ✨ Features

- **Search** from the hero search form or the header search bar
- **Debounced live search** in the header (waits 500 ms after you stop typing, minimum 2 characters)
- **Poster card grid** showing title, year, and type (movie / series)
- **Details modal** with poster, runtime, age rating, director, actors, genres, IMDb rating, and plot
- **Loading spinner** while data is being fetched
- **Friendly UI states** for: no results, too many results, and network/API errors
- **Request cancellation** with `AbortController` so outdated searches never overwrite newer ones
- **Fallback poster** image when a title has no poster
- Close the modal by clicking outside, using the ✕ button, or pressing `Esc`
- Responsive layout with CSS

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6+): `fetch`, `async/await`, `AbortController`, debounce, event delegation
- [OMDb API](https://www.omdbapi.com/)

## 📁 Project Structure

```
Movie Explorer/
├── index.html
├── script.js
└── style.css
```

## 🔑 API Key Setup

This project needs a free OMDb API key.

1. Get a free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).
2. Open `script.js` and set your key at the top of the file:
   ```js
   const API_KEY = "YOUR_API_KEY";
   ```

> ⚠️ **Security note:** Because this is a front-end only project, the key is visible to anyone who opens the browser's developer tools. Free OMDb keys are low-risk, but never put private or paid keys in client-side code. For real projects, keep keys on a server or in environment variables.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Movie-Explorer.git
   ```
2. Add your API key as described above.
3. Open `index.html` in your browser (or use the VS Code *Live Server* extension).
4. Search for a movie, e.g. `Inception` or `Batman`.

## 🎯 What I Learned

- Calling a REST API with `fetch` and `async/await`
- Handling errors from both the network and the API response
- Improving performance and UX with debounce and `AbortController`
- Building dynamic UI (cards, modal, status messages) from JSON data
- Event delegation for dynamically created elements

## 🔮 Possible Improvements

- Pagination / infinite scroll for more results
- Favorites list saved in `localStorage`
- Filter by type (movie / series) and year
- Sanitizing API text before inserting into the DOM

## 🙏 Credits

Movie data provided by the [OMDb API](https://www.omdbapi.com/).

## 👤 Author

**Hamed Foroutani**
GitHub: [@forotanihamed-maker](https://github.com/forotanihamed-maker)
