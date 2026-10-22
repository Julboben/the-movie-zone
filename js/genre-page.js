// Builds genre.html for the genre in the URL, e.g. genre.html?genre=action.
// The content comes from js/genres.js; the markup from the <template>
// elements in genre.html.

const genreId = new URLSearchParams(location.search).get("genre");
const genreIndex = genres.findIndex((genre) => genre.id === genreId);

function renderMovie(movie) {
  const card = document
    .querySelector("#movie-template")
    .content.cloneNode(true);
  card.querySelector("h3").textContent = `${movie.title} (${movie.year})`;

  const poster = card.querySelector(".poster-img");
  poster.src = movie.poster;
  poster.width = movie.width;
  poster.height = movie.height;
  poster.alt = `${movie.title} poster`;

  card.querySelector("figcaption p").textContent = movie.plot;

  const readMore = card.querySelector(".button");
  readMore.href = `https://www.imdb.com/title/${movie.imdb}/`;
  readMore.setAttribute("aria-label", `Read More about ${movie.title} on IMDb`);

  if (!movie.hot) card.querySelector(".hot").remove();
  return card;
}

function renderAd(ad) {
  const banner = document.querySelector("#ad-template").content.cloneNode(true);
  banner.querySelector("img").src = ad.image;
  banner.querySelector("img").alt = ad.alt;

  const still = banner.querySelector("source");
  if (ad.still) still.srcset = ad.still;
  else still.remove();
  return banner;
}

function renderGenre(genre, index) {
  document.title = `${genre.name} - The Movie Zone`;
  document.querySelector("h1").textContent = genre.name;
  document
    .querySelectorAll(".genre-plural")
    .forEach((el) => (el.textContent = genre.plural));

  const intro = document.querySelector("#intro");
  genre.intro.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    intro.append(paragraph);
  });

  const list = document.querySelector("#top-movies");
  genre.movies.forEach((movie, i) => {
    list.append(renderMovie(movie));
    list.append(renderAd(ads[(index + i) % ads.length]));
  });
}

if (genreIndex === -1) {
  location.replace("under-construction.html");
} else {
  renderGenre(genres[genreIndex], genreIndex);
}
