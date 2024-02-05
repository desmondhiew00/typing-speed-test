$(() => {
  $('main').prepend(headerHtml);

  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const navLinks = $('#navbar');
  const links = navLinks.find('a');

  links.each((_index, link) => {
    const href = link.getAttribute('href');
    if (page === href) {
      $(link).addClass('active');
    }
  });

  /* ----------------------------- Title Animation ---------------------------- */
  const fadeDuration = 1000;
  const Title = $('#title');
  const Subtitle = $('#subtitle');
  const Content = $('#content');

  Title.css({ top: '2rem', opacity: 0 });
  Title.animate({ top: '1rem', opacity: 1 }, fadeDuration);
  Subtitle.css({ top: '1rem', opacity: 0 });
  Subtitle.delay(500).animate({ top: 0, opacity: 1 }, fadeDuration);
  // Content.hide().delay(1000).fadeIn(fadeDuration);
});

const headerHtml = `
<header>
  <nav>
    <ul id="navbar">
      <li><a href="index.html">Typing</a></li>
      <li><a href="keyboard.html">Keyboard</a></li>
      <li><a href="settings.html">Settings</a></li>
      <li><a href="history.html">History</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
  </nav>
</header>
`;
