import {Config} from "./models/Config";
import {Log} from "./models/Log";
import {Characteristic, Service} from "./index";
import * as WebRequest from 'web-request';

export class PilightHttpAccessory {

    private log: (format: string, message: any) => void;
    private host: string;
    private port: number;
    private type: string;
    private deviceName: string;
    private informationService: any;
    private service: any;
    private baseUrl: string;
    private stateUrl: string;
    private powerUrl: string;


    constructor(log: Log, config: Config) {
        this.log = log;
        this.host = config.host;
        this.port = config.port;
        this.type = config.type;
        this.deviceName = config.deviceName;
        this.baseUrl = 'http://' + this.host + ':' + this.port;
        this.stateUrl = this.baseUrl + '/' + 'config';
        this.powerUrl = this.baseUrl + '/control?device=' + this.deviceName + '&state=';

        this.instantiateServices()
    }

    private instantiateServices() {
        this.informationService = new Service.AccessoryInformation();
        this.informationService
            .setCharacteristic(Characteristic.Manufacturer, "Test Manufacturer")
            .setCharacteristic(Characteristic.Model, "Test Model")
            .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

        this.service = new Service.Switch("my switch");
        this.service
            .getCharacteristic(Characteristic.On)
            .on('get', this.getPowerState.bind(this))
            .on('set', this.setPowerState.bind(this));
    }

    public getServices() {
        return [this.informationService, this.service]
    }

    private getPowerState(callback: any) {
        WebRequest.json<any>(this.stateUrl)
            .then(r => {
                const state = r.devices[this.deviceName].state;
                this.log('State is: %s', state);
                callback(null, state === 'on')

            }).catch(error => {
                this.log('Error on getting state: %s', error.message);
                callback(error)
        })
    }

    private setPowerState(powerState: boolean, callback: any) {
        let state: string;
        if (powerState) state = 'on';
        else state = 'off';

        WebRequest.get(this.powerUrl + state)
            .then(() => {
                this.log('toggle power succeeded', '');
                callback()
            }).catch(error => {
                this.log("Power on failed: %s", error.message);
                callback(error);
        })
    }


    // fetch(this.stateUrl)
    //     .then(response => {
    //         const devicesJson = response.json()
    //             .then(json => {
    //                 const state = json.devices[this.deviceName].state;
    //                 callback(null, state);
    //                 this.log('State is: %s', state === 'on');
    //             });
    //     }).catch(error => {
    //     this.log('Get state failed: %s', error.message);
    //     callback(error, false)
    // })

}

