"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PilightHttpAccessory_1 = require("./PilightHttpAccessory");
var Service, Characteristic;
exports.Service = Service;
exports.Characteristic = Characteristic;
module.exports = function (homebridge) {
    exports.Service = Service = homebridge.hap.Service;
    exports.Characteristic = Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-pilight-http", "PilightHttp", PilightHttpAccessory_1.PilightHttpAccessory);
};
//# sourceMappingURL=index.js.map