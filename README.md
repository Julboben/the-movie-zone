# The Movie Zone

A school project recreating a late-90's movie website: a home page and six genre
pages with frames, blinking GIFs, banner ads, a MIDI soundtrack, a webring and a
visitor counter, built with modern, accessible HTML and CSS underneath.

![Desktop screenshot](docs/screenshot.webp)

<img src="docs/screenshot-mobile.webp" alt="Mobile screenshot" width="250" />

## How to Run

Serve the folder with any static web server and open `index.html`, e.g.

```sh
npx live-server   # reloads the page when you save a file
# or
python3 -m http.server
```

Then open the URL it prints (<http://localhost:8000> for Python).

Opening `index.html` directly from disk (`file://`) mostly works, but the browser
will block the MIDI player from loading `music/blade-runner.mid`.

## Project Structure

| Path                      | What it is                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `index.html`              | Entry point. Two iframes, menu and content, like a 90's frameset.                            |
| `nav.html`                | The menu and sidebar ads. Links open in the content frame (`target="main"`).                 |
| `home.html`               | The home page: welcome, music player, genre list, news, webring and visitor counter.         |
| `genre.html`              | One page for every genre, e.g. `genre.html?genre=action`. Filled in by `js/genre-page.js`.   |
| `under-construction.html` | Placeholder for every page that doesn't exist yet.                                           |
| `css/tokens.css`          | Design tokens: every color, font and size (see Design).                                      |
| `css/styles.css`          | All styles, for every page. Uses only the tokens.                                            |
| `js/genres.js`            | Content of the genre pages: intro, Top 3 movies and the banner ads.                          |
| `js/genre-page.js`        | Renders `genre.html` from `js/genres.js` using the `<template>`s in genre.html.              |
| `js/nav.js`               | Highlights the menu item for the page shown in the content frame.                            |
| `js/quiet-audio.js`       | Silences the info logs from the MIDI player's libraries.                                     |
| `vendor/`                 | Third-party JavaScript (see Dependencies), each with its license.                            |
| `images/`                 | Images and GIFs. `images/posters/` has the movie posters, `images/still/` non-animated GIFs. |
| `music/`                  | MIDI files for the player.                                                                   |
| `favicon.svg`             | Pixel-art favicon.                                                                           |

## Features

- Frame layout with a menu and content frame
- Home page plus six genres (Action, Comedy, Drama, Musical, Science Fiction,
  Thriller), each with a Top 3 list. All movies are from before 1999, to match
  the site's 1999 setting.
- On phones the menu turns into a horizontally scrolling bar at the top
- MIDI music player
- Animated GIFs, banner ads, "under construction" signs and a visitor counter
  (just for show: it's plain HTML and CSS and always says 000420)
- Marquee and blinking text, done in CSS
- No CSS framework, no web fonts, nothing to build

## Design

The look is a late-90's fan site, built with the materials of the time:

- **GeoCities style:** a tiled star background, Times New Roman, bright HTML 3.2
  named colors, black `<table border>`-style boxes, `<hr>` dividers, a marquee,
  blinking text, a webring, a guestbook and "Best viewed with..." badges
- **Windows 95/98 interface:** grey 3D buttons, navy title bars, a grey menu frame
  with a visible frame border, and a matching music player
- **Only system fonts**, because web fonts didn't exist yet. The font sizes
  follow the old `<font size="1">` to `<font size="7">` scale.
- **800x600:** the content is 760px wide, as on a typical 1999 screen

### Design tokens

All colors, fonts, sizes, borders and timings are CSS custom properties in
`css/tokens.css`, in three layers:

1. **Primitives** (`--palette-*`, `--font-family-*`, `--font-size-1` to `-7`,
   `--size-*`): the raw values.
2. **Semantic** (`--color-text`, `--color-link`, `--font-heading`,
   `--space-m`, `--bevel-raised`...): what a value is for. `styles.css` mostly
   uses these.
3. **Component** (`--button-*`, `--titlebar-*`, `--marquee-*`, `--odometer-*`,
   `--frame-*`): values for one component.

Each layer only uses the one above it, and `styles.css` has no hard-coded colors.
To change the look, change a semantic token: for example, set
`--color-heading-2: var(--palette-fuchsia)` to make every `h2` pink.

### Accessibility

- Semantic HTML (`nav`, `main`, `article`, `figure`, lists) and descriptive alt texts
- Frames have titles, links are real links, and keyboard focus is visible
- Visitors with _reduce motion_ turned on in their OS get still images instead of
  animations (`<picture>` with a `prefers-reduced-motion` source), a still
  marquee and no blinking
- Blinking text stops after 5 blinks, and hovering the marquee pauses it

### Security

- Every page has a Content-Security-Policy. Everything loads from the site itself,
  except the SoundFont (see Dependencies).
- `style-src` needs `'unsafe-inline'` because the MIDI player sets inline styles.
- The site has no inline JavaScript. The one `sha256-` hash in `script-src` allows
  the live-reload script that `live-server` injects into each page. It only
  matches that exact script, so it can't let anything else run.

## Dependencies

Nothing to install. The libraries are copied into the repo, unchanged from npm.

| Dependency                                                           | Where                      | Used for                          |
| -------------------------------------------------------------------- | -------------------------- | --------------------------------- |
| [html-midi-player](https://github.com/cifkao/html-midi-player) 1.4.0 | `vendor/html-midi-player/` | The `<midi-player>` element       |
| [Tone.js](https://tonejs.github.io/) 14.8.49                         | `vendor/tone/`             | Audio engine for the MIDI player  |
| [Magenta.js](https://magenta.tensorflow.org/js) core 1.23.1          | `vendor/magenta/`          | MIDI parsing and playback         |
| [Magenta SoundFont](https://github.com/magenta/magenta-js)           | `storage.googleapis.com`   | Instrument samples for the player |

The SoundFont is the only thing loaded from another server. The player downloads
only the notes the song uses, but that's still about 8 MB in 221 files for
`blade-runner.mid`, which is too big to keep in the repo.

To update a library, download the new version's file from
`https://cdn.jsdelivr.net/npm/<package>@<version>/<path>` into its `vendor/`
folder. Tone.js has to stay on version 14, because Magenta 1.23.1 is built for it.

## Adding a Movie or a Genre Page

- **Movie:** add it to the genre's `movies` in `js/genres.js`, and its poster
  (about 250px wide, WebP) to `images/posters/`.
- **Genre:** add an entry to `genres` in `js/genres.js`, then link to
  `genre.html?genre=<id>` in the menu (`nav.html`) and the genre list
  (`home.html`). An unknown genre goes to the under-construction page.

## Credits

The code is written for educational use. Movie posters, GIFs, banner ads, MIDI
files and the Science Fiction texts belong to their respective owners and are
used here only as part of a non-commercial school project. The posters are
low-resolution copies from the films' Wikipedia articles. The other plot
summaries and genre intros were written for this site.

## Author

Julian Bendtsen
