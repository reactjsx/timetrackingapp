const helpers = exports;

const pad = (numberString, size) => {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
};

const millisecondsToHuman = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
};

helpers.newTimer = (attrs = {}) => {
  const timer = {
    title: attrs.title || 'Timer',
    project: attrs.project || 'Project',
    id: uuid.v4(), // eslint-disable-line no-undef
    elapsed: 0,
  };

  return timer;
};

helpers.findById = (array, id, cb) => {
  array.forEach((el) => {
    if (el.id === id) {
      cb(el);
    }
  });
};

helpers.renderElapsedString = (elapsed, runningSince) => {
  let totalElapsed = elapsed;
  if (runningSince) {
    totalElapsed += Date.now() - runningSince;
  }
  return millisecondsToHuman(totalElapsed);
};