import { fighterType } from './../../../customTypes';
import { createElement } from '../helpers/domHelper';
import { createFightersSelector } from './fighterSelector';

export function createFighters(fighters: fighterType[]) {
  const selectFighter = createFightersSelector();
  const container: HTMLElement = createElement({ tagName: 'div', className: 'fighters___root' });
  const preview: HTMLElement = createElement({ tagName: 'div', className: 'preview-container___root' });
  const fightersList: HTMLElement = createElement({ tagName: 'div', className: 'fighters___list' });
  const fighterElements: HTMLElement[] = fighters.map((fighter) => createFighter(fighter, selectFighter));

  fightersList.append(...fighterElements);
  container.append(preview, fightersList);

  return container;
}

function createFighter(fighter: fighterType, selectFighter: (event: MouseEvent, fighterId: string) => Promise<void> ) {
  const fighterElement = createElement({ tagName: 'div', className: 'fighters___fighter' });
  const imageElement = createImage(fighter);
  const onClick = (event: MouseEvent) => selectFighter(event, fighter._id);

  fighterElement.append(imageElement);
  fighterElement.addEventListener('click', onClick, false);

  return fighterElement;
}

function createImage(fighter: fighterType) {
  const { source, name } = fighter;
  const attributes = { 
    src: source,
    title: name,
    alt: name, 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter___fighter-image',
    attributes
  });

  return imgElement;
}