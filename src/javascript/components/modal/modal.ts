import { createElement } from '../../helpers/domHelper';

export function showModal(
  { title,
    bodyElement,
    onClose = () => {}
  }: 
  { 
    title: string,
    bodyElement: HTMLElement,
    onClose: Function 
  }) {
  const root = getModalContainer();
  const modal = createModal({ title, bodyElement, onClose }); 
  
  root.append(modal);
}

const getModalContainer = (): HTMLElement => document.getElementById('root')!;

function createModal(
  { title,
    bodyElement,
    onClose = () => {}
  }: 
  { 
    title: string,
    bodyElement: HTMLElement,
    onClose: Function 
  }) {
  const layer = createElement({ tagName: 'div', className: 'modal-layer' });
  const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
  const header = createHeader(title, onClose);

  modalContainer.append(header, bodyElement);
  layer.append(modalContainer);

  return layer;
}

function createHeader(title: string, onClose: Function = () => {}) {
  const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
  const titleElement = createElement({ tagName: 'span' });
  const closeButton = createElement({ tagName: 'div', className: 'close-btn' });
  
  titleElement.innerText = title;
  closeButton.innerText = '×';
  
  const close = () => {
    hideModal();
    onClose();
  }
  closeButton.addEventListener('click', close);
  headerElement.append(titleElement, closeButton);
  
  return headerElement;
}

function hideModal() {
  const modal = document.getElementsByClassName('modal-layer')[0];
  modal?.remove();
}
