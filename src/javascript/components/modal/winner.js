import {showModal} from './modal';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  let bodyElement = createElement({tagName:"div"});
  let onClose = () => location.reload();
  
  bodyElement.innerHTML = `Congratulations to ${fighter.name}!`;
  showModal({ title: `${fighter.number} fighter - ${fighter.name} win!`, bodyElement, onClose });
}
