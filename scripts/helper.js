const isValidTextKey = (key) => {
  const allow = "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~";
  const isSpace = key === " " || key === "　";
  return (
    (key.length === 1 && key.match(/[a-z0-9]/i)) ||
    allow.includes(key) ||
    isSpace
  );
};

const parseKey = (key) => {
  const isBackspace = key === "Backspace";
  const isSpace = key === " " || key === "　";
  const isEnter = key === "Enter";
  const isExit = key === "Escape";
  return { isBackspace, isSpace, isEnter, isExit };
};

const getQueryStringValue = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};
