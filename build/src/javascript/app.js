import { createFighters } from './components/fightersView';
import { fighterService } from './services/fightersService';
// import { strict } from 'assert';
class App {
    constructor() {
        this.startApp();
    }
    async startApp() {
        try {
            App.loadingElement.style.visibility = 'visible';
            const fighters = await fighterService.getFighters();
            const fightersElement = createFighters(fighters);
            App.rootElement.appendChild(fightersElement);
        }
        catch (error) {
            console.warn(error);
            App.rootElement.innerText = 'Failed to load data';
        }
        finally {
            App.loadingElement.style.visibility = 'hidden';
        }
    }
}
App.rootElement = document.getElementById('root');
App.loadingElement = document.getElementById('loading-overlay');
export default App;
