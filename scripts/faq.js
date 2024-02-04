$(async () => {
  const data = await $.getJSON('data/faq.json');
  data.forEach(({ question, answer }) => {
    $('.faq').append(faqHtml(question, answer));
  });

  $('.faq-question').on('click', function () {
    var answer = $(this).next('.faq-answer');
    if (answer.is(':visible')) {
      answer.slideUp();
    } else {
      answer.slideDown();
    }
  });
});

const faqHtml = (question, answer) => `
  <div class="faq-item">
    <div class="faq-question">${question}</div>
    <div class="faq-answer">${answer}</div>
  </div>
`;
