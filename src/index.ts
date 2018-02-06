import {PilightHttpAccessory} from "./PilightHttpAccessory";

let Service: any, Characteristic: any;

module.exports = function(homebridge: any) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-pilight-http", "PilightHttp", PilightHttpAccessory)
};

export {Service, Characteristic}

