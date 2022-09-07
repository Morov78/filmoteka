import { btnDayNight } from './js/btnDayNight';
import { renderMoviesList, scrollToTop } from './js/container';
import MovieAPiServer from './js/RequestApi/requestAPI';
import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { paramsNotify } from './js/notify-params/notify-styles';
import { modalPagination } from './js/modal/modalPagination';
import { funcLoginControl } from './js/AutoForm/js/avtoLogin';
import { funcCheck } from './js/AutoForm/js/avtoLogin';
import { debounce } from 'lodash';
import { languageRender } from './js/languageRender';

refs.languageSwitch = document.querySelector('.language__input');

let currentGroup = 'home';
const languageList = ['en-US', 'uk-UA'];

const movieAPiServer = new MovieAPiServer();
// console.log(movieAPiServer.language);
checkLanguage();

// console.log(movieAPiServer.language);
movieAPiServer.getGenresList();
Notify.init(paramsNotify);

refs.pagginationList.addEventListener('click', onClickPagginationList);
refs.form.addEventListener('submit', onSubmitForm);
refs.galleryList.classList.add('home');
refs.avtoLogin.addEventListener('click', funcLoginControl);
refs.languageSwitch.addEventListener(
  'change',
  debounce(onChangeLanguageSwitch, 500)
);
// window.addEventListener("keydown", toggleModalEscape);// футер модал ескейп
console.log(document.querySelector('.language__input').checked);
btnDayNight();
fetchData();

funcCheck();

function checkCurrentPage() {
  if (currentGroup === 'home') {
    fetchData();
  } else {
    fetchMovieByQueryAgain();
  }
  scrollToTop();
}
function onClickPagginationList(event) {
  const currentPage = event.target.dataset.page;
  if (currentPage === '...') {
    modalPagination(movieAPiServer.maxPages)
      .then(page => {
        if (Number(page) === movieAPiServer.pageCounter) {
          return;
        }
        console.log('перехід на сторінку ', page);
        movieAPiServer.pageCounter = Number(page);
        checkCurrentPage();
      })
      .catch(error => console.log(error));
    return;
  }
  if (!currentPage) {
    return;
  }
  movieAPiServer.pageCounter = Number(currentPage);
  checkCurrentPage();
}

function fetchData() {
  movieAPiServer.fetchTopMovies().then(data => {
    // console.log('page=', apiService.page, '  maxPages=', apiService.maxPages);
    clearList();
    renderMoviesList(data, movieAPiServer.pageCounter, movieAPiServer.maxPages);
  });
  // .catch(error => {
  //   return error;
  // });
}

function onSubmitForm(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  refs.form.elements.searchQuery.value = '';
  if (searchQuery === '') {
    Notify.failure('Please enter something', { width: '180px' });
    return;
  }
  movieAPiServer.searchQuery = searchQuery;
  const pageHome = movieAPiServer.pageCounter;
  movieAPiServer.pageCounter = 1;
  movieAPiServer
    .fetchMovieByQuery()
    .then(data => {
      console.log(data);
      if (data.results.length === 0) {
        Notify.failure(
          'Search result not successful.. Enter the correct movie name'
        );
        movieAPiServer.pageCounter = pageHome;
        return;
      }
      movieAPiServer.maxPages = data.total_pages;
      currentGroup = 'search';
      clearList();
      renderMoviesList(
        data.results,
        movieAPiServer.pageCounter,
        movieAPiServer.maxPages
      );
    })
    .catch(error => {
      return error;
    });
}
function fetchMovieByQueryAgain() {
  movieAPiServer
    .fetchMovieByQuery()
    .then(data => {
      clearList();
      renderMoviesList(
        data.results,
        movieAPiServer.pageCounter,
        movieAPiServer.maxPages
      );
    })
    .catch(error => {
      return error;
    });
}
function clearList() {
  refs.galleryList.innerHTML = '';
  refs.pagginationList.innerHTML = '';
}

async function onChangeLanguageSwitch(event) {
  const checked = event.target.checked;
  const oldLanguage = movieAPiServer.language;
  checked
    ? (movieAPiServer.language = languageList[0])
    : (movieAPiServer.language = languageList[1]);
  // console.log(movieAPiServer.language);
  if (oldLanguage === movieAPiServer.language) {
    return;
  }
  await movieAPiServer.getGenresList();
  checkCurrentPage();
  location.href = window.location.pathname;
  location.reload();
}
function checkLanguage() {
  const oldLanguage = movieAPiServer.language;
  const language =
    JSON.parse(localStorage.getItem('language')) || languageList[0];
  movieAPiServer.language = language;
  document.querySelector('body').classList.add(`${language}`);
  if (language === languageList[0]) {
    refs.languageSwitch.checked = true;
  } else {
    refs.languageSwitch.checked = false;
  }
  languageRender(language);
}
