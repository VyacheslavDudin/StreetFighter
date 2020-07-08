import { controls } from '../../constants/controls';

export async function fight(_firstFighter, _secondFighter) {  
  return new Promise((resolve) => {
    const COMBO_COOLDOWN = 10000;
    //For fixing error while fighters are identical, and they are references on the same object
    const firstFighter = {..._firstFighter};
    const secondFighter = {..._secondFighter};
    let pressed = new Set();
    let controlKeys = new Set(Object.values(controls).flat());
    const comboKeysPressed = comboKeys => comboKeys.every(key => pressed.has(key));
    const isBlocking = blockKey => pressed.has(blockKey);
    let {
          PlayerOneCriticalHitCombination: hitCritComb1,
          PlayerTwoCriticalHitCombination: hitCritComb2,
          PlayerOneAttack: playerOneAttack,
          PlayerOneBlock: playerOneBlock,
          PlayerTwoAttack: playerTwoAttack,
          PlayerTwoBlock: playerTwoBlock,
        } = controls;
    const healthBarLeft = document.getElementById('left-fighter-indicator');
    const healthBarRight = document.getElementById('right-fighter-indicator');
    const maxHealthFighterOne = firstFighter.health;
    const maxHealthFighterTwo = secondFighter.health;

    function keyDownListener(event) {
      if(controlKeys.has(event.code)){
        pressed.add(event.code);
      }
      else return;
      
      if( 
          (
            (comboKeysPressed(hitCritComb1) || 
              event.code === playerOneAttack
            ) &&
            isBlocking(playerOneBlock)
          ) ||
          (
            (
              comboKeysPressed(hitCritComb2) || 
              event.code === playerTwoAttack
            ) &&
            isBlocking(playerTwoBlock)
          )
        ) return;
  
      if(comboKeysPressed(hitCritComb1) && !isBlocking(playerOneBlock)) {
        secondFighter.health = reduceHealth(secondFighter, 2 * firstFighter.attack, healthBarRight, maxHealthFighterTwo);
        hitCritComb1.forEach( (key) => {
          pressed.delete(key);
          controlKeys.delete(key);
        });
  
        setTimeout(() => hitCritComb1.forEach((key) => controlKeys.add(key) ), COMBO_COOLDOWN);
      }
      else if(comboKeysPressed(hitCritComb2) && !isBlocking(playerTwoBlock)) {
        firstFighter.health = reduceHealth(firstFighter, 2 * secondFighter.attack, healthBarLeft, maxHealthFighterOne);
        hitCritComb2.forEach((key) => {
          pressed.delete(key);
          controlKeys.delete(key);
        });
  
        setTimeout(() => hitCritComb2.forEach((key) => controlKeys.add(key) ), COMBO_COOLDOWN);
      } 
      else if(event.code === playerOneAttack) {
        if(isBlocking(playerTwoBlock)) {
          controlKeys.delete(playerOneAttack);
          return;
        }
        else {
          secondFighter.health = reduceHealth(secondFighter, getDamage(firstFighter, secondFighter), healthBarRight, maxHealthFighterTwo);
          controlKeys.delete(playerOneAttack);
        }
      }
      else if(event.code === playerTwoAttack) {
        if(isBlocking(playerOneBlock)) {
          controlKeys.delete(playerTwoAttack);
          return;
        }
        else {
          firstFighter.health = reduceHealth(firstFighter, getDamage(secondFighter, firstFighter), healthBarLeft, maxHealthFighterOne);
          controlKeys.delete(playerTwoAttack);
        }
      }
      else return;
  
      if(firstFighter.health <= 0) {
        secondFighter.number = 'Second';
        document.removeEventListener('keydown', keyDownListener);
        resolve(secondFighter);
      }
      else if(secondFighter.health <= 0) {
        firstFighter.number = 'First';
        document.removeEventListener('keydown', keyDownListener);
        resolve(firstFighter);
      }
    };
    function keyUpListener(event) {
      if(!pressed.has(event.code))
        return;
      pressed.delete(event.code);
  
      
      if(event.code === playerOneAttack) {
        controlKeys.add(playerOneAttack);
      }
      else if(event.code === playerTwoAttack) {
        controlKeys.add(playerTwoAttack);
      }
      else return;
  
    }

    document.addEventListener('keydown', keyDownListener);

    document.addEventListener('keyup', keyUpListener);
  });
}

export function getDamage(attacker, defender) {
  let dealedDamage = getHitPower(attacker) - getBlockPower(defender);
  return dealedDamage >= 0
  ? dealedDamage
  : 0;
}

export function getHitPower(fighter) {
  let criticalHitChance = getRandomInRange(1, 2);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = getRandomInRange(1, 2);
  return fighter.defense * dodgeChance;
}

export function reduceHealth({health}, damage, healthBar, maxHealth) {
  let damagedHealth = (health - damage) > 0
    ? (health - damage)
    : 0;
  healthBar.style.width = (100 * damagedHealth / maxHealth) + '%';
  return damagedHealth;
}

export const getRandomInRange = (start, end) => (end - start) * Math.random() + start;