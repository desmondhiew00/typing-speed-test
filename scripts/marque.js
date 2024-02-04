$(() => {
  $('body').append(marqueHtml);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles/marque.css';
  document.head.appendChild(link);

  $('#marque').hide();
  setTimeout(() => {
    $('#marque').fadeIn(500);
  }, 10);
});

const marqueHtml = `
<div id="marque">
  <div class="marquee">
    <div class="marquee-content">
      Q W E R T Y U I O P A S D F G H J K L Z X C V B N M 1 2 3 4 5 6 7 8 9 0
      Q W E R T Y U I O P A S D F G H J K L Z X C V B N M 1 2 3 4 5 6 7 8 9 0
      Q W E R T Y U I O P A S D F G H J K L Z X C V B N M 1 2 3 4 5 6 7 8 9 0
      Q W E R T Y U I O P A S D F G H J K L Z X C V B N M 1 2 3 4 5 6 7 8 9 0
    </div>
  </div>
  <div class="marquee second">
    <div class="marquee-content">
      Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
      Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
      Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
      Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
    </div>
  </div>
  <div class="marquee third">
    <div class="marquee-content">
      Print Screen Scroll Lock Pause Break Insert Home Page Up Delete End Page Down
      Print Screen Scroll Lock Pause Break Insert Home Page Up Delete End Page Down
      Print Screen Scroll Lock Pause Break Insert Home Page Up Delete End Page Down
      Print Screen Scroll Lock Pause Break Insert Home Page Up Delete End Page Down
    </div>
  </div>
</div>
`;
