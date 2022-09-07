import MovieAPiServer from '../RequestApi/requestAPI';
const movieAPiServer = new MovieAPiServer();
import { markupModal } from './markupModal';
import { ModalClose } from './modalClose';
export const close = new ModalClose();

export const getPost = async e => {
  movieAPiServer.movieId = e.currentTarget.dataset.ip;

  try {
    const language = JSON.parse(localStorage.getItem('language'));
    movieAPiServer.language = language;
    const response = await movieAPiServer.fetchMovieById();
    await markupModal(response);

    await document
      .querySelector('.closeV')
      .addEventListener('click', close.onToggle);
  } catch (error) {
    // не забыть влепить нотифашку
  }
};
