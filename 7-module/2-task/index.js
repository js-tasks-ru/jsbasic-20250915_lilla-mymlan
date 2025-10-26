import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
          </h3>
        </div>
  
        <div class="modal__body">
        </div>
      </div>
    </div>
      `);

    this.setTitle();
    this.setBody();
    this.onClick();
    this.close();
    this.onKey();

    return this.elem;
  }

  open() {
    document.body.classList.add('is-modal-open');

    document.body.append(this.elem);
  }

  setTitle(titleText) {
    let title = this.elem.querySelector('.modal__title');
    title.textContent = titleText;
  }

  setBody(node) {
    let body = this.elem.querySelector('.modal__body');
    let lastNode = body.lastElementChild;
    if(lastNode) lastNode.remove();
    /*вставляется еще текст undefined, не могу понять, почему */
    body.append(node);
  }

  onClick() {
    let modalClose = this.elem.querySelector('.modal__close')
    modalClose.addEventListener('click',() => {
      document.body.classList.remove('is-modal-open');
      this.elem.remove();
      document.keydown = null;
    });
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.keydown = null;
  }

  onKey() {
    let modal = this.elem;
    function keyEsc(event) {
      if(event.code === 'Escape') {
        document.body.classList.remove('is-modal-open');
        modal.remove();
        document.keydown = null;
      }
    };
    document.addEventListener('keydown',keyEsc);
  }

}
