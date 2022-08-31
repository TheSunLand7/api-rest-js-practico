/**Some general settings */
let { log, warn, group, groupEnd, error } = console;

/**Main code */
const $fragment = document.createDocumentFragment();
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: API_KEY,
    },
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    }
});

const $createMovies = (data, container) => {
    container.innerHTML = '';
    data.forEach(movie => {
        const $movieContainer = document.createElement('div');
        $movieContainer.classList.add('movie-container');
        $movieContainer.addEventListener('click', _ => {
            location.hash = `#movie=${movie.id}`;
        })

        const $movieImg = document.createElement('img');
        $movieImg.classList.add('movie-img');
        $movieImg.setAttribute('alt', movie.title);
        $movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);

        $movieContainer.appendChild($movieImg);
        $fragment.appendChild($movieContainer);
    });
    container.appendChild($fragment);

};

const createCategories = (data, container) => {
    container.innerHTML = '';

    data.forEach(category => {
        const $categoryContainer = document.createElement('div');
        $categoryContainer.classList.add('category-container');
        const $categoryTitle = document.createElement('h3');
        $categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        $categoryTitle.classList.add('category-title');
        $categoryTitle.setAttribute('id', `id${category.id}`);
        $categoryTitle.innerText = `${category.name}`;

        $categoryContainer.appendChild($categoryTitle);
        $fragment.appendChild($categoryContainer);
    });
    container.appendChild($fragment);

};

async function getTrendingMoviesPreview() {
    try {
        const { data } = await api('/trending/movie/day');
        const movies = data.results;
        // log({ data, movies });

        $createMovies(movies, trendingMoviesPreviewList);
    } catch (error) {
        let message = error.message || 'Something went wrong!';
        log(message);
    }
}

async function getCategoriesPreview() {
    try {
        const { data } = await api('genre/movie/list');
        const categories = data.genres;
        // log({ categories });
        createCategories(categories, categoriesPreviewList);
    } catch (error) {
        let message = error.message || 'Something went wrong';
        log(message);
    }
}

async function getMoviesByCategory(id) {
    try {
        const { data } = await api('discover/movie', {
            params: {
                with_genres: id,
            }
        });
        const movies = data.results;
        // log({ data, movies });

        $createMovies(movies, genericSection);

    } catch (error) {
        let message = error.message || 'Something went wrong!';
        log(message);
    }
}
async function getMoviesBySearch(query) {
    try {
        const { data } = await api('search/movie', {
            params: {
                query,
            }
        });
        const movies = data.results;
        // log({ data, movies });

        $createMovies(movies, genericSection);

    } catch (error) {
        let message = error.message || 'Something went wrong!';
        log(message);
    }
}

async function getTrendingMovies() {
    try {
        const { data } = await api('/trending/movie/day');
        const movies = data.results;
        // log({ data, movies });

        $createMovies(movies, genericSection);
    } catch (error) {
        let message = error.message || 'Something went wrong!';
        log(message);
    }
}
async function getMovieById(movieId) {
    try {
        const { data: movie } = await api(`movie/${movieId}`);

        movieDetailTitle.innerText = movie.title;
        movieDetailDescription.innerText = movie.overview;
        movieDetailScore.innerText = movie.vote_average.toFixed(1);
        const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
        url(${movieImgUrl})
        `;

        createCategories(movie.genres, movieDetailCategoriesList);
        getRelatedMovies(movieId);

    } catch (error) {
        let message = error.message || 'Something went wrong!';
        log(message);
    }
}

async function getRelatedMovies(id) {
    try {
        const { data } = await api(`movie/${id}/similar`);
        const relatedMovies = data.results;

        // log(data, movies);
        $createMovies(relatedMovies, relatedMoviesContainer);
    } catch (error) {
        let message = error.message || 'Something went wrong!';
        log(message);
    }
}

export {
    getTrendingMoviesPreview,
    getCategoriesPreview,
    getMoviesByCategory,
    getMoviesBySearch,
    getTrendingMovies,
    getMovieById
};