// Keeps the MIDI player's libraries from filling the console with info logs.
// Must be loaded before vendor/tone/Tone.js.

// Tone.js prints a version banner when it loads unless this flag is set.
window.TONE_SILENCE_LOGGING = true;

// Magenta logs a line for every SoundFont instrument it loads. Its own
// switch for this, core.logging.setVerbosity(), does nothing in v1.23.1, so
// drop just those lines: they are always logged with the magenta label style
// below. Everything else (and all of Magenta's warnings) still gets through.
const consoleLog = console.log;
console.log = (...args) => {
  if (args[1] === "background:magenta; color:white") return;
  consoleLog(...args);
};
