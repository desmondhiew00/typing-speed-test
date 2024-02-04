$(() => {
  const themSetting = $('#theme-settings');
  const currentTheme = getThemeColor();

  Object.keys(themeColors).forEach((key) => {
    const color = themeColors[key][300];
    const $div = $('<div class="theme-color"></div>');
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
});
