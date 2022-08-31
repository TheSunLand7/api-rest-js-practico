//Model
const bluePrint = (selector) => document.querySelector(selector);

// Sections
const headerSection = bluePrint('#header');
const trendingPreviewSection = bluePrint('#trendingPreview');
const categoriesPreviewSection = bluePrint('#categoriesPreview');
const genericSection = bluePrint('#genericList');
const movieDetailSection = bluePrint('#movieDetail');

// Lists & Containers
const searchForm = bluePrint('#searchForm');
const trendingMoviesPreviewList = bluePrint('.trendingPreview-movieList');
const categoriesPreviewList = bluePrint('.categoriesPreview-list');
const movieDetailCategoriesList = bluePrint('#movieDetail .categories-list');
const relatedMoviesContainer = bluePrint('.relatedMovies-scrollContainer');

// Elements
const headerTitle = bluePrint('.header-title');
const arrowBtn = bluePrint('.header-arrow');
const headerCategoryTitle = bluePrint('.header-title--categoryView');

const searchFormInput = bluePrint('#searchForm input');
const searchFormBtn = bluePrint('#searchBtn');

const trendingBtn = bluePrint('.trendingPreview-btn');

const movieDetailTitle = bluePrint('.movieDetail-title');
const movieDetailDescription = bluePrint('.movieDetail-description');
const movieDetailScore = bluePrint('.movieDetail-score');