const animationTime = 200;

const Modal = {
  init: () => {},
  open: () => {},
  close: () => {},
};

$(() => {
  loadModalHtml();

  const Component = {
    modal: $("#modal"),
    content: $("#modal-content"),
    title: $("#modal-title"),
    closeBtn: $("#modal-close-btn"),
  };

  let opened = false;
  /* --------------------------------- Methods -------------------------------- */

  Modal.open = ({ title, element } = {}) => {
    Component.modal.fadeIn(animationTime);
    if (title) Component.title.text(title);
    if (element) Component.content.append(element);
    opened = true;
  };

  Modal.close = () => {
    Component.modal.fadeOut(animationTime);
    opened = false;
    setTimeout(() => {
      Component.title.text("");
      Component.content.empty();
    }, animationTime);
  };

  /* -------------------------------- Listener -------------------------------- */

  Component.modal.click((e) => {
    if (e.target.id === "modal") {
      Modal.close();
    }
  });

  $("#modal-close-btn").click(() => {
    Modal.close();
  });

  $(document).keyup((e) => {
    if (!opened) return;
    const key = e.originalEvent.key;
    const { isEnter, isExit } = parseKey(key);
    if (isEnter || isExit) Modal.close();
  });
});

const loadModalHtml = () => {
  const modalHtml = `
          <div id="modal" class="modal">
          <div class="modal-content-container">
              <div class="header">
              <span id="modal-title"></span>
              <span id="modal-close-btn" class="close-btn">&times;</span>
              </div>
              <div id="modal-content">
              </div>
          </div>
          </div>
      `;

  $("body").append(modalHtml);
};
