import { data } from '../data.js';
console.log(data);

// const dataArray = JSON.parse(data);
// console.log(dataArray);
export function languageRender(language) {
  // const title = document.querySelector('.lang-title');
  // const library = document.querySelector('.lang-library');
  // console.log(title);
  // if (language === 'uk-UA') {
  //   title.innerHTML = 'головна';
  //   library.innerHTML = 'моя бібліотека';
  // } else {
  //   title.innerHTML = 'home';
  //   library.innerHTML = 'library';
  // }
  // location.href = window.location.pathname;
  // location.reload();

  for (let key in data) {
    // console.log(key);
    const selector = `.lang-` + key;
    // console.log(selector);
    // console.log(data[key][language]);
    document.querySelector(selector).innerHTML = data[key][language];
  }
  const inputPlaceholder = document.querySelector('.lang-input');
  if (language === 'uk-UA') {
    inputPlaceholder.placeholder = 'Пошук фільму';
  } else {
    inputPlaceholder.placeholder = 'Movie search';
  }

  // console.log(key);
  // const selector = `.lang-` + key;
  // console.log(selector);
  // const element = document.querySelector(`.lang-${key}`);
  // console.log(element);
}
