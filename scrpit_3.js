//TMDB API key

const API_KEY = "api_key=5fbf0637e827b941f51d26672d0c620e";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/movie/upcoming?" + API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search_input");

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            showMovies(data.results);
        });
}

function showMovies(data) {
    main.innerHTML = "";

    data.forEach((movie) => {
        const { title, poster_path, vote_average, genre_ids } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <button>${genre(genre_ids)}</button>
            <span class=""> ${star(vote_average)} </span>
            <h3>${title}</h3>
        </div>

        `;
        main.appendChild(movieEl);
    });
}

function star(vote) {
    if (vote >= 8) {
        return "&#9733; &#9733; &#9733; &#9733; &#9733";
    } else if (vote >= 7) {
        return "&#9733; &#9733; &#9733; &#9733";
    } else if (vote >= 5) {
        return "&#9733; &#9733; &#9733;";
    } else if (vote >= 4) {
        return "&#9733; &#9733;";
    } else {
        return "&#9733;";
    }
}

function genre(genre_ids) {
    console.log(genre_ids[0]);
    if (genre_ids[0] == 28) {
        return "Action";
    } else if (genre_ids[0] == 12) {
        return "Adventure";
    } else if (genre_ids[0] == 16) {
        return "Animation";
    } else if (genre_ids[0] == 35) {
        return "Comedy";
    } else if (genre_ids[0] == 80) {
        return "Crime";
    } else if (genre_ids[0] == 99) {
        return "Documentary";
    } else if (genre_ids[0] == 18) {
        return "Drama";
    } else if (genre_ids[0] == 10751) {
        return "Family";
    } else if (genre_ids[0] == 14) {
        return "Fantasy";
    } else if (genre_ids[0] == 36) {
        return "History";
    } else if (genre_ids[0] == 27) {
        return "Horror";
    } else if (genre_ids[0] == 10402) {
        return "Music";
    } else if (genre_ids[0] == 9648) {
        return "Mystery";
    } else if (genre_ids[0] == 10749) {
        return "Romance";
    } else if (genre_ids[0] == 878) {
        return "Science Fiction";
    } else if (genre_ids[0] == 10770) {
        return "TV Movie";
    } else if (genre_ids[0] == 53) {
        return "Thriller";
    } else if (genre_ids[0] == 10752) {
        return "War";
    } else if (genre_ids[0] == 37) {
        return "Western";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + "&query=" + searchTerm);
    }
});
