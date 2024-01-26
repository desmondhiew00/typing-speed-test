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
    counterText: $('#counter-text')
  };

  let lang = getQueryStringValue('lang') || 'en';
  const isJapanese = lang === 'jp';
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

    component.input.focus();

    // Update UI
    component.startBtn.hide();
    component.input.addClass('typing');
    component.testArea.css('opacity', 1);
    component.counterText.text(duration);

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

    component.input.removeClass('typing');
    component.startBtn.show();
    component.counter.css('stroke-dashoffset', 0);
    component.counterText.text(duration);
    component.testArea.css('opacity', 0.3);
    showResult();
  };

  const loadRandomText = () => {
    component.sentences.empty();
    const article = isJapanese ? jpnArticle : txtgen.article();
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
      component.wpm.text(wpm);
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
    const key = e.originalEvent.key;
    const { isBackspace, isSpace, isEnter, isExit } = parseKey(key);
    const validKey = isValidTextKey(key);

    if (validKey) keyPressedEffect(key);

    if (typingStarted) {
      if (isExit) endTest();
    } else {
      if (isEnter) startTest();
      return;
    }

    if (!isBackspace && !isEnter) {
      if (!validKey) return;
    }

    const words = component.sentences.find('.word');
    const currentWord = $(words[0]);
    const currentText = currentWord.text();
    const correctChar = currentText.charAt(0) === key;
    const currentSourceWord = sourceWords[typedWords.length];

    // submit word
    if (isSpace || isEnter) {
      if (isJapanese && isEnter) return;
      if (!userInput) return;
      userTyped += `${userInput} `;
      keyPressedEffect(userInput);
      const isCorrectWord = currentSourceWord === userInput;

      const words = [userInput];

      for (text of words) {
        const span = $('<span>').text(userInput);
        span.attr('class', isCorrectWord ? 'correct' : 'wrong');

        // Update UI
        component.typed.append(span);
        currentWord.remove();
        typedWords.push(userInput);
        if (isJapanese) component.input.text('');

        // Update logic data
        typedWordsCount++;
        typedCharsCount += userInput.length;
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
    const title = "Great Job! Let's Review";
    const element = `<p>You type with the speed of <b>${wpm} WPM</b> (${cpm} CPM). Your accuracy was <b>${
      accuracy || 0
    }%</b>.</p>`;
    Modal.open({ title, element });
  };

  /* ----------------------------- Event Listener ----------------------------- */
  $(document).keyup(handleKeyUp);

  component.input.keydown(function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents new lines on Enter key
    }
  });

  /* ----------------------------------- Init ---------------------------------- */
  init();
});
