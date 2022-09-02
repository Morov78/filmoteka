import { refs } from './refs';
const blankMovie = refs.imageBlank.src;

function markupList(data, genresList) {
  // console.log(data, genresList);
  return data
    .map(
      ({
        genre_ids,
        genres,
        id,
        title,
        release_date,
        poster_path,
        vote_average,
      }) => {
        if (!genre_ids) {
          genre_ids = genres.map(genre => genre.id);
        }

        return `
      <li class="gallery__item  "  data-ip=${id}>
        <img class="gallery__img  "
         ${
           poster_path
             ? `src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"`
             : `src="${blankMovie}"`
         } loading="lazy">
        <div class="gallery__info">
          <p class="gallery__title them">${title}</p>
          <p class="gallery__text them">${getGenresMovie(
            genre_ids,
            genresList
          )} | <span>${getDate(
          release_date
        )}</span><span class="gallery__rating them ">${getRating(
          vote_average
        )}</span></p>
        </div>
      </li>`;
      }
    )
    .join(' ');
}
function getRating(vote_average) {
  const roundRating = Math.round(vote_average * 10);
  if (roundRating === 0) {
    return '0.0';
  }
  const roundRatingString = roundRating.toString();
  const length = roundRatingString.length;
  const goodRating =
    roundRatingString.slice(0, length - 1) +
    '.' +
    roundRatingString[length - 1];
  return goodRating;
}
function getDate(release_date) {
  if (!release_date) {
    return 'No date';
  }
  return new Date(release_date).getFullYear();
}
function getGenresMovie(genre_ids, genresList) {
  if (genre_ids.length === 0) {
    return 'No genre';
  }
  const genresMovie = genre_ids
    .map(genreId => genresList.find(({ id }) => id === genreId))
    .map(({ name }) => name);
  if (genresMovie.length > 3) {
    genresMovie.splice(2, genresMovie.length - 2, 'Other');
  }
  return genresMovie.join(', ');
}

export { markupList };
