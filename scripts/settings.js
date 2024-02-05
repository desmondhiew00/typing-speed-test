$(() => {
  const themSetting = $('#theme-settings');
  const currentTheme = getThemeColor();

  Object.keys(themeColors).forEach((key) => {
    const color = themeColors[key][300];
    const $div = $('<div class="theme-color"></div>');
    $div.attr('id', key);
    $div.css('background-color', color);
    themSetting.append($div);

    if (key === currentTheme) {
      $div.addClass('active');
    }

    $div.click(() => {
      setThemeColor(key);
      themSetting.find('.active').removeClass('active');
      $div.addClass('active');
    });
  });

  // const keys = Object.keys(themeColors);
  // let currentIndex = keys.findIndex((v) => v === currentTheme);
  // $(document).on('wheel', function (e) {
  //   const isUp = e.originalEvent.deltaY < 0;
  //   currentIndex = nextIndex(currentIndex, keys.length - 1, !isUp);
  //   setThemeColor(keys[currentIndex]);
  //   themSetting.find('.active').removeClass('active');
  //   $(`#${keys[currentIndex]}`).addClass('active');
  // });
});

const nextIndex = (current, max, next) => {
  let result = next ? current + 1 : current - 1;
  if (result > max) result = 0;
  if (result < 0) result = max;
  return result;
};
