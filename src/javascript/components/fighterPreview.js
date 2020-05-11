import { createElement } from '../helpers/domHelper';
import { fighters } from '../helpers/mockData';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if(fighter){
    const imgElement = createFighterImage(fighter);
    const {name, health, attack, defense} = fighter;
    const divFighterInfo = createElement({tagName:'div', className:"fighter-preview__info"}); 
    divFighterInfo.innerHTML=`
        <span>Name: ${name}</span>
        <span>Health: ${health}</span>
        <span>Attack: ${attack}</span>
        <span>Defense: ${defense}</span>
      </div>
    `;
    fighterElement.appendChild(imgElement);
    fighterElement.appendChild(divFighterInfo);
  }
  


  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
