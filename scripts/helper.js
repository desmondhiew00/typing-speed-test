/**
 *
 * @param {string} key
 * @returns {boolean}
 */
const isValidTextKey = (key) => {
  const allow = '!@#$%^&*()_+-=[]{};\':",./<>?\\|`~';
  const isSpace = key === ' ' || key === '　';
  return (
    (key.length === 1 && key.match(/[a-z0-9]/i)) ||
    allow.includes(key) ||
    isSpace
  );
};

/**
 *
 * @param {string} key
 * @returns {{isBackspace: boolean, isSpace: boolean, isEnter: boolean, isExit: boolean}}
 */
const parseKey = (key) => {
  const isBackspace = key === 'Backspace';
  const isSpace = key === ' ' || key === '　';
  const isEnter = key === 'Enter';
  const isExit = key === 'Escape';
  return { isBackspace, isSpace, isEnter, isExit };
};

/**
 * @param {string} key
 * @returns {string}
 */
const getQueryStringValue = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

/**
 * @param {string} param
 * @param {string} value
 * @returns {string}
 */
const updateQueryParameter = (param, value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  return url.href;
};

/**
 *
 * @param {number} length
 * @param {string} type hiragana | katakana
 * @returns
 */
const generateRandomJpnSentence = (length, type = 'hiragana') => {
  const hiraganaChars =
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  const katakanaChars =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  let chars = type === 'katakana' ? katakanaChars : hiraganaChars;
  let sentence = '';
  for (let i = 0; i < length; i++) {
    sentence += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sentence;
};

/**
 * @returns {string}
 */
const generateRandomSentence = () => {
  return txtgen.article();
};

/**
 * @param {string} value
 * @returns {boolean}
 */
const isRomaji = (value) => {
  const romajiRegex = /^[A-Za-z\s-]+$/;
  return romajiRegex.test(value);
};
