import { type Dependencies } from "../store/dependencies";
import { createStore, type AppStore } from "../store/store";
import { HttpAuthGateway } from "../authentification/infrastructure/HttpAuthGateway";
import { HttpUserGateway } from "../user/infrastructure/HttpUserGateway";
import { HttpEventGateway } from "../events/infrastructure/HttpEventGateway";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            authGateway: new HttpAuthGateway(),
            userGateway: new HttpUserGateway(),
            eventGateway: new HttpEventGateway(),
        };
    }
}


export const app = new App();