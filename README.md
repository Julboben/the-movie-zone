# The Movie Zone

A school project recreating a late-90's movie website: a science fiction page
with frames, blinking GIFs, banner ads, a MIDI soundtrack and a visitor counter,
built with modern, accessible HTML and CSS underneath.

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

| Path                      | What it is                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `index.html`              | Entry point. Two iframes, menu and content, like a 90's frameset.                             |
| `nav.html`                | The menu and sidebar ads. Links open in the content frame (`target="main"`).                  |
| `main.html`               | The Science Fiction page.                                                                     |
| `under-construction.html` | Placeholder for every page that doesn't exist yet.                                            |
| `css/styles.css`          | All styles, for every page.                                                                   |
| `js/movies.js`            | The "Top 3" movies and the banner ads between them, rendered from `<template>`s in main.html. |
| `js/nav.js`               | Keeps the current menu item highlighted.                                                      |
| `js/quiet-audio.js`       | Silences the info logs from the MIDI player's libraries.                                      |
| `vendor/`                 | Third-party JavaScript (see Dependencies), each with its license.                             |
| `fonts/`                  | The Orbitron font and its license.                                                            |
| `images/`                 | Images and GIFs. `images/still/` holds non-animated versions (see Accessibility).             |
| `music/`                  | MIDI files for the player.                                                                    |
| `favicon.svg`             | Pixel-art favicon.                                                                            |

## Features

- Frame layout with a menu and content frame
- On phones the menu turns into a horizontally scrolling bar at the top
- MIDI music player
- Animated GIFs, banner ads, "under construction" signs and a visitor counter
  (just for show: it's plain HTML and CSS and always says 000420)
- No CSS framework: the look is plain CSS with custom properties

### Accessibility

- Semantic HTML (`nav`, `main`, `article`, `figure`, lists) and descriptive alt texts
- Frames have titles, links are real links, and keyboard focus is visible
- Visitors with _reduce motion_ turned on in their OS get still images instead of
  animations (`<picture>` with a `prefers-reduced-motion` source)

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
| [Orbitron](https://github.com/theleagueof/orbitron)                  | `fonts/orbitron/`          | The font                          |
| [Magenta SoundFont](https://github.com/magenta/magenta-js)           | `storage.googleapis.com`   | Instrument samples for the player |

The SoundFont is the only thing loaded from another server. The player downloads
only the notes the song uses, but that's still about 8 MB in 221 files for
`blade-runner.mid`, which is too big to keep in the repo.

To update a library, download the new version's file from
`https://cdn.jsdelivr.net/npm/<package>@<version>/<path>` into its `vendor/`
folder. Tone.js has to stay on version 14, because Magenta 1.23.1 is built for it.

## Adding a Movie or a Genre Page

- **Movie:** add an entry to `movies` in `js/movies.js` (and its image to `images/`).
- **Genre page:** copy `main.html`, then point the menu link in `nav.html` at it.

## Credits

The code is written for educational use. Movie stills, plot summaries, GIFs, banner
ads and MIDI files belong to their respective owners and are used here only as
part of a non-commercial school project.

## Author

Julian Bendtsen
