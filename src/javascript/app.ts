import { createFighters } from './components/fightersView';
import { fighterService } from './services/fightersService';
// import { strict } from 'assert';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement: HTMLElement = document.getElementById('root')!;
  static loadingElement: HTMLElement = document.getElementById('loading-overlay')!;

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';

      const fighters = await fighterService.getFighters();
      const fightersElement: HTMLElement = createFighters(fighters);

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;
