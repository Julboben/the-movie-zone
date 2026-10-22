// Renders the "Top 3" list on main.html. To change the list, edit the data
// below; the markup lives in the <template> elements in main.html.

const movies = [
  {
    title: "Blade Runner",
    year: 1982,
    image: "images/blade-runner.webp",
    imdb: "https://www.imdb.com/title/tt0083658/",
    hot: true,
    plot: "In a cyberpunk vision of the future, man has developed the technology to create replicants, human clones used to serve in the colonies outside Earth but with fixed lifespans. In Los Angeles, 2019, Deckard is a Blade Runner, a cop who specialises in terminating replicants. Originally in retirement, he is forced to re-enter the force when five replicants escape from an offworld colony to Earth.",
  },
  {
    title: "2001: A Space Odyssey",
    year: 1968,
    image: "images/2001-space-odyssey.webp",
    imdb: "https://www.imdb.com/title/tt0062622/",
    plot: "When a large black monolith is found beneath the surface of the moon, the reaction immediately is that it was intentionally buried. When the point of origin is confirmed as Jupiter, an expedition is sent in hopes of finding the source. When Dr David Bowman discovers faults in the expeditionary space craft's communications system, he discovers more than he ever wanted to know.",
  },
  {
    title: "Alien",
    year: 1979,
    image: "images/alien.webp",
    imdb: "https://www.imdb.com/title/tt0078748/",
    plot: "When commercial towing vehicle Nostromo, heading back to Earth, intercepts an SoS signal from a nearby planet, the crew are under obligation to investigate. After a bad landing on the planet, some crew members leave the ship to explore the area. At the same time as they discover a hive colony of some unknown creature, the ship's computer deciphers the message to be a warning, not a call for help. When one of the eggs is disturbed, the crew do not know the danger they are in until it is too late.",
  },
];

// Banner ads, one after each movie. `still` is a non-animated version shown
// to visitors who prefer reduced motion.
const ads = [
  { image: "images/yahoo.gif", alt: "Yahoo!" },
  {
    image: "images/casino.gif",
    still: "images/still/casino.webp",
    alt: "Casino gambling and sports wagering",
  },
  {
    image: "images/pets.gif",
    still: "images/still/pets.webp",
    alt: "PetQuarters, the Internet's premier pet store",
  },
];

const list = document.querySelector("#top-movies");
const movieTemplate = document.querySelector("#movie-template");
const adTemplate = document.querySelector("#ad-template");

function renderMovie(movie) {
  const card = movieTemplate.content.cloneNode(true);
  card.querySelector("h3").textContent = `${movie.title} (${movie.year})`;
  card.querySelector(".poster-img").src = movie.image;
  card.querySelector(".poster-img").alt = movie.title;
  card.querySelector("figcaption p").textContent = movie.plot;

  const readMore = card.querySelector(".button");
  readMore.href = movie.imdb;
  readMore.setAttribute("aria-label", `Read More about ${movie.title} on IMDb`);

  if (!movie.hot) card.querySelector(".hot").remove();
  return card;
}

function renderAd(ad) {
  const banner = adTemplate.content.cloneNode(true);
  banner.querySelector("img").src = ad.image;
  banner.querySelector("img").alt = ad.alt;

  const still = banner.querySelector("source");
  if (ad.still) still.srcset = ad.still;
  else still.remove();
  return banner;
}

movies.forEach((movie, i) => {
  list.append(renderMovie(movie));
  if (ads[i]) list.append(renderAd(ads[i]));
});
