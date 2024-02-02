$(() => {
  const component = {
    startBtn: $('#start-btn'),
    wpm: $('#wpm'),
    cpm: $('#cpm'),
    accuracy: $('#accuracy'),
    testArea: $('#test-area'),
    input: $('#text-input'),
    typed: $('#text-typed'),
    sentences: $('#sentences'),
    counter: $('#counter-circle'),
    counterText: $('#counter-text'),
    btnLangEn: $('#btnLangEn'),
    btnLangHiragana: $('#btnLangHiragana'),
    btnLangKatakana: $('#btnLangKatakana')
  };

  const TextComponent = {
    switchLang: $('#text-switch-lang'),
    title: $('#title'),
    subtitle: $('#subtitle'),
    counterLabel: $('#counter-text-label'),
    statisticTextWords: $('#statistic-text-words'),
    statisticTextChars: $('#statistic-text-chars'),
    statisticTextAccuracy: $('#statistic-text-accuracy'),
    startBtn: $('#start-btn')
  };

  // en, hiragana, katakana
  let langType = getQueryStringValue('lang') || 'en';
  let isJapanese = langType === 'hiragana' || langType === 'katakana';
  let sourceWords = [];
  let typedWords = [];
  let userInput = ''; // typing words
  let userTyped = ''; // typed words
  let duration = 60;
  let timeLeft = duration;
  let typingStarted = false;
  let interval = null;

  // Initialize counts
  let typedWordsCount = 0;
  let typedCharsCount = 0;
  let correctWordsCount = 0;

  /* -------------------------------- Functions ------------------------------- */
  const init = () => {
    typedWords = [];
    userInput = '';
    userTyped = '';
    timeLeft = duration - 0;
    typedWordsCount = 0;
    typedCharsCount = 0;
    correctWordsCount = 0;

    component.input.text('');
    component.typed.empty();
    component.counterText.text(duration);
  };

  const startTest = () => {
    if (typingStarted) return;
    init();
    loadRandomText();
    updateStatisticData(true);
    typingStarted = true;

    // Update UI
    component.wpm.text(0);
    component.cpm.text(0);
    component.accuracy.text(0);
    component.startBtn.hide();
    component.input.addClass('typing');
    component.testArea.css('opacity', 1);
    component.counterText.text(duration);

    if (isJapanese) {
      component.input.attr('contenteditable', 'true');
      component.input.trigger('focus');
    } else {
      component.input.attr('contenteditable', 'true');

      component.input.on('keydown', function (event) {
        event.preventDefault(); // Prevents new lines on Enter key
      });

      component.input.trigger('focus');
    }

    const circumference = 2 * Math.PI * component.counter.attr('r');

    // Timer interval
    clearInterval(interval);
    interval = setInterval(() => {
      timeLeft -= 1;

      const offset = circumference - (timeLeft / duration) * circumference;
      component.counterText.text(timeLeft);
      component.counter.css('stroke-dashoffset', offset);

      if (timeLeft < 0) {
        endTest();
      }
    }, 1000);
  };

  const endTest = () => {
    clearInterval(interval);
    typingStarted = false;

    component.input.trigger('blur');

    component.input.removeClass('typing');
    component.startBtn.show();
    component.counter.css('stroke-dashoffset', 0);
    component.counterText.text(duration);
    component.testArea.css('opacity', 0.3);
    showResult();
  };

  const loadRandomText = () => {
    component.sentences.empty();
    const article = isJapanese
      ? generateRandomJpnSentence(200, langType)
      : txtgen.article();
    const words = article.split(isJapanese ? '' : ' ');
    for (text of words) {
      sourceWords.push(text);
      const span = $('<span>').text(text);
      span.attr('class', 'word');
      component.sentences.append(span);
    }
  };

  const getStatisticData = (reset) => {
    let accuracy = reset ? 0 : (correctWordsCount / typedWordsCount) * 100;
    const wpm = reset ? 0 : typedWordsCount;
    const cpm = reset ? 0 : typedCharsCount;

    if (isNaN(accuracy)) accuracy = 0;
    else accuracy = accuracy.toFixed(0);

    return { accuracy, wpm, cpm };
  };

  const updateStatisticData = (reset) => {
    try {
      const { accuracy, wpm, cpm } = getStatisticData(reset);
      if (!isJapanese) component.wpm.text(wpm);
      component.cpm.text(cpm);
      component.accuracy.text(accuracy);
    } catch (e) {
      console.log(e);
    }
  };

  const keyPressedEffect = (key) => {
    const keyElement = $('<div class="key-pressed"></div>').text(key);
    $('body').append(keyElement);
    keyElement.css({
      top: Math.random() * window.innerHeight - 10,
      left: Math.random() * window.innerWidth - 10
    });
    keyElement.on('animationend', function () {
      $(this).remove();
    });
  };

  const handleKeyUp = (e) => {
    if (isJapanese) component.input.trigger('focus');

    const key = e.originalEvent.key;
    const { isBackspace, isSpace, isEnter, isExit } = parseKey(key);
    const validKey = isValidTextKey(key);

    if (validKey && !typingStarted && !isJapanese) keyPressedEffect(key);

    if (typingStarted) {
      if (isExit) endTest();
    } else {
      if (isEnter) startTest();
      return;
    }

    if (!isBackspace && !isEnter) {
      if (!validKey) return;
    }

    let wordsElems = component.sentences.find('.word');
    let currentWord = $(wordsElems[0]);
    let currentText = currentWord.text();
    let currentSourceWord = sourceWords[typedWords.length];
    const correctChar = currentText.charAt(0) === key;

    // submit word
    if (isSpace || isEnter) {
      if (!userInput) return;
      userInput = userInput.replace(/\s/g, '');
      userTyped += `${userInput} `;

      let words = [userInput];
      if (isJapanese) {
        if (langType === 'katakana') {
          words = wanakana.toKatakana(userInput).split('');
        } else {
          words = wanakana.toHiragana(userInput).split('');
        }
      }
      keyPressedEffect(words.join(''));

      for (let index = 0; index < words.length; index++) {
        wordsElems = component.sentences.find('.word');
        currentWord = $(wordsElems[0]);
        currentText = currentWord.text();
        currentSourceWord = sourceWords[typedWords.length];

        const text = words[index];
        const isCorrectWord = currentSourceWord === text;
        const span = $('<span>').text(text);
        span.attr('class', isCorrectWord ? 'correct' : 'wrong');

        // Update UI
        component.typed.append(span);
        currentWord.remove();
        typedWords.push(text);
        if (isJapanese) component.input.text('');

        // Update logic data
        typedWordsCount++;
        typedCharsCount += isJapanese ? 1 : userInput.length;
        if (isCorrectWord) correctWordsCount++;
      }

      userInput = '';
      updateStatisticData();
    } else if (isBackspace) {
      if (currentText !== currentSourceWord) {
        const revertChar = currentSourceWord.replace(currentText, '').slice(-1);
        if (revertChar === userInput.slice(-1)) {
          currentWord.text(revertChar.slice(-1) + currentText);
        }
      }
      userInput = userInput.slice(0, -1);
    } else {
      if (isJapanese) {
        userInput = component.input.text();
      } else {
        userInput += key;
      }
      if (correctChar) currentWord.text(currentText.substr(1));
    }

    if (!isJapanese) component.input.text(userInput);
  };

  const showResult = () => {
    const { accuracy, wpm, cpm } = getStatisticData();

    const title = isJapanese ? '素晴らしい' : "Great Job! Let's Review";
    let element = `<p>You type with the speed of <b>${wpm} WPM</b> (${cpm} CPM). Your accuracy was <b>${
      accuracy || 0
    }%</b>.</p>`;

    if (isJapanese) {
      element = `<p>あなたのタイピング速度は<b>(${cpm} 文字/分)</b>です。正確率は<b>${accuracy}%</b>でした。</p>`;
    }
    Modal.open({ title, element });
  };

  // en, hiragana, katakana
  const handleLangChange = (type) => {
    const url = updateQueryParameter('lang', type);
    window.location.href = url;
  };

  const initLang = async () => {
    const activeClassName = 'action-btns-selected';
    if (langType === 'en') {
      component.btnLangEn.addClass(activeClassName);
    } else if (langType === 'hiragana') {
      component.btnLangHiragana.addClass(activeClassName);
    } else if (langType === 'katakana') {
      component.btnLangKatakana.addClass(activeClassName);
    }

    $.getJSON('data/lang.json', (data) => {
      const key = isJapanese ? langType : 'en';
      TextComponent.title.text(data.title[key]);
      TextComponent.subtitle.text(data.subtitle[key]);
      TextComponent.switchLang.text(data.switchLang[key]);
      TextComponent.counterLabel.text(data.counterLabel[key]);
      TextComponent.startBtn.text(data.startBtn[key]);
      TextComponent.statisticTextChars.text(data.statisticTextChars[key]);
      TextComponent.statisticTextAccuracy.text(data.statisticTextAccuracy[key]);
      TextComponent.statisticTextWords.text(data.statisticTextWords[key]);
      if (isJapanese) component.wpm.text(langType === 'katakana' ? 'カ' : 'ひ');
    });
  };

  /* ----------------------------- Event Listener ----------------------------- */
  $(document).on('keyup', handleKeyUp);

  // reset value for scroll event
  const resetValue = debounce(() => {
    updateStatisticData();
  }, 50);

  $(document).on('wheel', (e) => {
    if (!typingStarted) {
      const value = Math.abs(e.originalEvent.deltaY);
      component.wpm.text(value);
      component.cpm.text(value);
      component.accuracy.text(value);
      resetValue();
    }
  });

  component.input.on('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents new lines on Enter key
    }
  });

  component.btnLangEn.on('click', () => {
    handleLangChange('en');
  });

  component.btnLangHiragana.on('click', () => {
    handleLangChange('hiragana');
  });

  component.btnLangKatakana.on('click', () => {
    handleLangChange('katakana');
  });

  $('#counter-container').on('click', () => {
    const ary = [5, 15, 30, 60];
    if (!typingStarted) {
      const index = ary.findIndex((v) => v > duration);
      duration = ary[index < 0 ? 0 : index];
      component.counterText.text(duration);
    }
  });

  component.startBtn.on('click', () => {
    startTest();
  });

  /* ----------------------------------- Init ---------------------------------- */
  init();
  initLang();

  const fadeDuration = 1000;

  TextComponent.title.css({ top: '50px', opacity: 0 });
  TextComponent.title.animate({ top: 0, opacity: 1 }, fadeDuration);

  TextComponent.subtitle.hide();
  TextComponent.subtitle.delay(1000).fadeIn(fadeDuration);

  $('#content').hide().delay(2000).fadeIn(fadeDuration);

  component.startBtn
    .hide()
    .css({ animation: 'none' })
    .delay(2000)
    .fadeIn(fadeDuration, () => {
      component.startBtn.css({ animation: 'blink 2s infinite' });
    });
});

const jpnArticle =
  'ひとつのHEMOの中に、複数の内容が含まれていると理解が難しくなるのは、外国語を習ったことがある人なら誰もが理解できることではないでしょうか。句点や接続詞を使い過ぎずに、ひとつの文章で伝えることをひとつだけに絞り込むようにしましょう。';
