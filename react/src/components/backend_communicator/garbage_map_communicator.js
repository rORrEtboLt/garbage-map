import BackendCommunicator from ".";
import { garbageMapUrls } from "./backend_urls";
import { method } from "./backend_constants";

export class GarbageMapCommunicator {
    constructor() {
        this.backendCommunicator = new BackendCommunicator();
    }

    get = (lat, lon) => {
        return this.backendCommunicator.fetch(garbageMapUrls.GET + '/' + lat + '/' + lon, {
            method: method.GET,
        });
    };

    create = (garbageMap) => {
        return this.backendCommunicator.fetch(garbageMapUrls.CREATE, {
            method: method.POST,
            body: JSON.stringify(garbageMap),
        });
    };
}
