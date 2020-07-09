import { fighterType, twoFighters } from '../../../customTypes';
import { fighterService } from './../services/fightersService';
import { createElement } from '../helpers/domHelper';
import { renderArena } from './arena';
import { createFighterPreview } from './fighterPreview';
import versusImg from './../../../resources/versus.png';


export function createFightersSelector() {
  let selectedFighters: [fighterType?, fighterType?] = [];

  return async (_event: MouseEvent, fighterId: string) => {
    const fighter = <fighterType>(await getFighterInfo(fighterId));
    const [playerOne, playerTwo] = selectedFighters;
    const firstFighter = playerOne ?? fighter;
    const secondFighter = <fighterType>(Boolean(playerOne) ? playerTwo ?? fighter : playerTwo);
    selectedFighters = [firstFighter, secondFighter];

    renderSelectedFighters(<twoFighters>selectedFighters);
  };
}


const fighterDetailsMap: Map<string, fighterType> = new Map();

export async function getFighterInfo(fighterId: string) {
  try {
    return fighterDetailsMap.has(fighterId)
    ?  fighterDetailsMap.get(fighterId)
    : fighterDetailsMap.set(fighterId, await fighterService.getFighterDetails(fighterId)).get(fighterId);
  }
  catch(err) {
    alert(`Cannot get fighter info. Error:${err}. Please try later!`);
    location.reload();
    return;
  }
}

function renderSelectedFighters(selectedFighters: twoFighters) {
  const fightersPreview = document.querySelector('.preview-container___root')!;
  const [playerOne, playerTwo] = selectedFighters;
  const firstPreview: HTMLElement = createFighterPreview(playerOne, 'left');
  const secondPreview: HTMLElement = createFighterPreview(playerTwo, 'right');
  const versusBlock: HTMLElement = createVersusBlock(selectedFighters);

  fightersPreview.innerHTML = '';
  fightersPreview.append(firstPreview, versusBlock, secondPreview);
}

function createVersusBlock(selectedFighters: twoFighters) {
  const canStartFight = selectedFighters.filter(Boolean).length === 2;
  const onClick = () => startFight(selectedFighters);
  const container: HTMLElement = createElement({ tagName: 'div', className: 'preview-container___versus-block' });
  const image: HTMLElement = createElement({
    tagName: 'img',
    className: 'preview-container___versus-img',
    attributes: { src: versusImg },
  });
  const disabledBtn = canStartFight ? '' : 'disabled';
  const fightBtn = createElement({
    tagName: 'button',
    className: `preview-container___fight-btn ${disabledBtn}`,
  });

  fightBtn.addEventListener('click', onClick, false);
  fightBtn.innerText = 'Fight';
  container.append(image, fightBtn);

  return container;
}

function startFight(selectedFighters: [fighterType, fighterType]) {
  renderArena(selectedFighters);
}
