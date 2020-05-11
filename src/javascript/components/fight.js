import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
 
  return new Promise((resolve) => {  
    //For fixing error while fighters are identical, and they are references on the same object
    secondFighter = {...secondFighter};
    let pressed = new Set();
    let controlKeys = new Set(Object.values(controls).flat());
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
    document.addEventListener('keydown', function keyDownListener(event) {
      if(controlKeys.has(event.code)){
        pressed.add(event.code);
      }
      else return;
      
      if( 
          (
            (hitCritComb1.every((key) => pressed.has(key)) || 
              event.code === playerOneAttack
            ) &&
            pressed.has(playerOneBlock)
          ) ||
          (
            (
              hitCritComb2.every((key) => pressed.has(key)) || 
              event.code === playerTwoAttack
            ) &&
            pressed.has(playerTwoBlock)
          )
        ) return;

       if(hitCritComb1.every((key) => pressed.has(key)) && !pressed.has(playerOneBlock)) {
        secondFighter.health = reduceHealth(secondFighter, 2 * firstFighter.attack, healthBarRight, maxHealthFighterTwo);
        hitCritComb1.forEach( (key) => {
          pressed.delete(key);
          controlKeys.delete(key);
        });

        setTimeout(() => hitCritComb1.forEach((key) => controlKeys.add(key) ), 10000);
      }
      else if(hitCritComb2.every((key) => pressed.has(key)) && !pressed.has(playerTwoBlock)) {
        firstFighter.health = reduceHealth(firstFighter, 2 * secondFighter.attack, healthBarLeft, maxHealthFighterOne);
        hitCritComb2.forEach((key) => {
          pressed.delete(key);
          controlKeys.delete(key);
        });

        setTimeout(() => hitCritComb2.forEach((key) => controlKeys.add(key) ), 10000);
      } 
      else if(event.code === playerOneAttack) {
        if(pressed.has(playerTwoBlock)) {
          controlKeys.delete(playerOneAttack);
          return;
        }
        else {
          secondFighter.health = reduceHealth(secondFighter, getDamage(firstFighter, secondFighter), healthBarRight, maxHealthFighterTwo);
          controlKeys.delete(playerOneAttack);
        }
      }
      else if(event.code === playerTwoAttack) {
        if(pressed.has(playerOneBlock)) {
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
    });

    document.addEventListener('keyup', function keyUpListener(event) {
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

    });
  });
}

export function getDamage(attacker, defender) {
  let dealedDamage = getHitPower(attacker) - getBlockPower(defender);
  return dealedDamage >= 0
  ? dealedDamage
  : 0;
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}

export function reduceHealth({health}, damage, healthBar, maxHealth) {
  let damagedHealth = (health - damage) > 0
    ? (health - damage)
    : 0;
  healthBar.style.width = (100 * damagedHealth / maxHealth) + '%';
  return damagedHealth;
}