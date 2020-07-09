import { fighterType } from './../../../../customTypes';
import {showModal} from './modal';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter: fighterType & {number?: 'First' | 'Second'}) {
  let bodyElement = createElement({tagName:"div"});
  let onClose = (): void => location.reload();
  
  bodyElement.innerHTML = `Congratulations to ${fighter.name}!`;
  showModal({ title: `${fighter.number} fighter - ${fighter.name} win!`, bodyElement, onClose });
}
