$(() => {
  const Component = {
    Keyboard: $('#keyboard'),
    KeyboardSide: $('#keyboard-side'),
    KeyboardNum: $('#keyboard-numpad')
  };

  // prettier-ignore
  const keyboardLayout = [
    [{ key: 'Esc', keyCode: 27 },
    { key: 'F1', keyCode: 112 }, { key: 'F2', keyCode: 113 }, { key: 'F3', keyCode: 114 }, { key: 'F4', keyCode: 115 },
    { key: 'F5', keyCode: 116 }, { key: 'F6', keyCode: 117 }, { key: 'F7', keyCode: 118 }, { key: 'F8', keyCode: 119 },
    { key: 'F9', keyCode: 120 }, { key: 'F10', keyCode: 121 }, { key: 'F11', keyCode: 122 }, { key: 'F12', keyCode: 123 }],

    [{ key: '`', keyCode: 192 }, { key: '1', keyCode: 49 }, { key: '2', keyCode: 50 }, { key: '3', keyCode: 51 }, { key: '4', keyCode: 52 },
    { key: '5', keyCode: 53 }, { key: '6', keyCode: 54 }, { key: '7', keyCode: 55 }, { key: '8', keyCode: 56 }, { key: '9', keyCode: 57 },
    { key: '0', keyCode: 48 }, { key: '-', keyCode: 189 }, { key: '=', keyCode: 187 }, { key: 'Backspace', keyCode: 8 }],

    [{ key: 'Tab', keyCode: 9 }, { key: 'q', keyCode: 81 }, { key: 'w', keyCode: 87 }, { key: 'e', keyCode: 69 }, { key: 'r', keyCode: 82 },
    { key: 't', keyCode: 84 }, { key: 'y', keyCode: 89 }, { key: 'u', keyCode: 85 }, { key: 'i', keyCode: 73 }, { key: 'o', keyCode: 79 },
    { key: 'p', keyCode: 80 }, { key: '[', keyCode: 219 }, { key: ']', keyCode: 221 }, { key: '\\', keyCode: 220 }],

    [{ key: 'Caps', keyCode: 20 }, { key: 'a', keyCode: 65 }, { key: 's', keyCode: 83 }, { key: 'd', keyCode: 68 }, { key: 'f', keyCode: 70 },
    { key: 'g', keyCode: 71 }, { key: 'h', keyCode: 72 }, { key: 'j', keyCode: 74 }, { key: 'k', keyCode: 75 }, { key: 'l', keyCode: 76 },
    { key: ';', keyCode: 186 }, { key: '\'', keyCode: 222 }, { key: 'Enter', keyCode: 13 }],

    [{ key: 'Shift', keyCode: 16 }, { key: 'z', keyCode: 90 }, { key: 'x', keyCode: 88 }, { key: 'c', keyCode: 67 }, { key: 'v', keyCode: 86 },
    { key: 'b', keyCode: 66 }, { key: 'n', keyCode: 78 }, { key: 'm', keyCode: 77 }, { key: ',', keyCode: 188 }, { key: '.', keyCode: 190 },
    { key: '/', keyCode: 191 }, { key: 'Shift', keyCode: "ShiftRight" }],

    [{ key: 'Ctrl', keyCode: 17 }, { key: 'Meta', keyCode: 91 }, { key: 'Alt', keyCode: 18 }, { key: 'Space', keyCode: 32 },
    { key: 'Alt', keyCode: "" }, { key: 'Meta', keyCode: 92 }, { key: '≣', keyCode: 93 }, { key: 'Ctrl', keyCode: "ControlRight" }]
  ];

  const sideKeysLayout = [
    [
      { key: 'Print', keyCode: 44 },
      { key: 'Scroll Lock', keyCode: 145 },
      { key: 'Pause', keyCode: 19 }
    ],
    [
      { key: 'Insert', keyCode: 45 },
      { key: 'Home', keyCode: 36 },
      { key: 'Page Up', keyCode: 33 }
    ],
    [
      { key: 'Delete', keyCode: 46 },
      { key: 'End', keyCode: 35 },
      { key: 'Page Down', keyCode: 34 }
    ],
    [],
    [{}, { key: '&#8593;', keyCode: 38 }, {}],
    [
      { key: '&#8592;', keyCode: 37 },
      { key: '&#8595;', keyCode: 40 },
      { key: '&#8594;', keyCode: 39 }
    ]
  ];

  const lg = ['Ctrl', 'Meta', 'Enter', 'Tab', 'Caps', 'Space', 'Tab'];
  const xl = ['Shift', 'Enter', 'Backspace', 'Esc'];

  keyboardLayout.forEach((row) => {
    const $row = $('<div class="row">');

    row.forEach((data) => {
      const { keyCode, key } = data;

      const $key = $(`<div id="${keyCode}" class="key">${key}</div>`);

      if (key === 'Space') $key.addClass('space');
      if (lg.includes(key)) $key.addClass('lg');
      if (xl.includes(key)) $key.addClass('xl');

      $row.append($key);
    });

    Component.Keyboard.append($row);
  });

  sideKeysLayout.forEach((row) => {
    const $row = $('<div class="row">');
    row.forEach((data) => {
      const { keyCode, key } = data;
      const $key = $(`<div id="${keyCode || ''}">${key || ''}</div>`);
      $key.addClass(key ? 'key' : 'empty-key');
      if (lg.includes(key)) $key.addClass('lg');
      if (xl.includes(key)) $key.addClass('xl');
      if (key && key.length > 2) $key.addClass('key-text-sm');
      $row.append($key);
    });
    if (row.length <= 0) {
      const $key = $(`<div class="empty-key"></div>`);
      $row.append($key);
    }
    Component.KeyboardSide.append($row);
  });

  $(document).on('keyup', function (e) {
    let code = e.keyCode;
    if (e.originalEvent.code === 'ShiftRight') code = 'ShiftRight';
    if (e.originalEvent.code === 'ControlRight') code = 'ControlRight';
    $(`#${code}`).removeClass('active');
  });

  $(document).on('keydown', function (e) {
    let code = e.keyCode;
    console.log(code);
    if (e.originalEvent.code === 'ShiftRight') code = 'ShiftRight';
    if (e.originalEvent.code === 'ControlRight') code = 'ControlRight';
    $(`#${code}`).addClass('active');

    return false;
  });

  // prevent tab focus on navbar link
  $('a').attr('tabindex', -1);
});
