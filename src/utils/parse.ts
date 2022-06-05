export = (micro: number) => {
  const ms = micro / 1000;
  const ss = ms / 1000;
  const mm = ss / 60;
  const hh = mm / 60;
  const dd = hh / 24;

  const microseconds = Math.round((ms % 1) * 1000);
  const milliseconds = Math.floor(ms % 1000);
  const seconds = Math.floor(ss % 60);
  const minutes = Math.floor(mm % 60);
  const hours = Math.floor(hh % 24);
  const days = Math.floor(dd);

  return {
    microseconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days
  };
};
