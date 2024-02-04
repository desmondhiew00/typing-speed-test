$(() => {
  const container = $('#history');
  const records = getRecords();

  if (records.length === 0) {
    container.append('<div class="history-item center">No records found</div>');
  } else {
    records.forEach((record) => {
      container.append(recordHtml(record));
    });
    container.append(
      '<div id="clear-history" class="history-item center clickable">Clear History</div>'
    );

    $('#clear-history').click(() => {
      Modal.open({
        title: 'Clear History',
        element: `
          <div>
            <p>Are you sure you want to clear the history?</p>
            <div class="modal-actions">
              <button id="confirm-clear" class="btn">Yes</button>
              <button id="cancel-clear" class="btn">No</button>
            </div>
          </div>
        `
      });

      $('#confirm-clear').click(async () => {
        Modal.close();
        const elems = container.children();
        for (let i = elems.length - 1; i > -1; i--) {
          await new Promise((resolve) => {
            $(elems[i]).fadeOut(200, function () {
              $(this).remove();
              resolve();
            });
          });
        }
        $empty = $('<div class="history-item center">No records found</div>');
        $empty.hide();
        container.append($empty.fadeIn(500));
        clearRecords();
      });

      $('#cancel-clear').click(() => {
        Modal.close();
      });
    });
  }
});

const recordHtml = (record) => {
  const formattedDate = new Date(record.timestamp).toLocaleString();
  return `
  <div class="history-item">
    <div class="record">
      <label>Language</label>
      <span>${getLanguage(record.langType)}</span>
    </div>

    <div class="record">
      <label>Accuracy</label>
      <span>${record.accuracy}%</span>
    </div>

    <div class="record">
      <label>Words/min</label>
      <span>${record.wpm}</span>
    </div>

    <div class="record">
      <label>Chars/min</label>
      <span>${record.cpm}</span>
    </div>

    <div class="timestamp">${formattedDate}</div>
  </div>
`;
};

const getLanguage = (langType = 'EN') => {
  switch (langType) {
    case 'EN':
      return 'English';
    case 'katakana':
      return 'Japanese (Katakana)';
    case 'hiragana':
      return 'Japanese (Hiragana)';
    default:
      return langType;
  }
};
