"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var WebRequest = __importStar(require("web-request"));
var PilightHttpAccessory = /** @class */ (function () {
    function PilightHttpAccessory(log, config) {
        this.log = log;
        this.host = config.host;
        this.port = config.port;
        this.type = config.type;
        this.deviceName = config.deviceName;
        this.baseUrl = 'http://' + this.host + ':' + this.port;
        this.stateUrl = this.baseUrl + '/' + 'config';
        this.powerUrl = this.baseUrl + '/control?device=' + this.deviceName + '&state=';
        this.instantiateServices();
    }
    PilightHttpAccessory.prototype.instantiateServices = function () {
        this.informationService = new index_1.Service.AccessoryInformation();
        this.informationService
            .setCharacteristic(index_1.Characteristic.Manufacturer, "Test Manufacturer")
            .setCharacteristic(index_1.Characteristic.Model, "Test Model")
            .setCharacteristic(index_1.Characteristic.SerialNumber, "123-456-789");
        this.service = new index_1.Service.Switch("my switch");
        this.service
            .getCharacteristic(index_1.Characteristic.On)
            .on('get', this.getPowerState.bind(this))
            .on('set', this.setPowerState.bind(this));
    };
    PilightHttpAccessory.prototype.getServices = function () {
        return [this.informationService, this.service];
    };
    PilightHttpAccessory.prototype.getPowerState = function (callback) {
        var _this = this;
        WebRequest.json(this.stateUrl)
            .then(function (r) {
            var state = r.devices[_this.deviceName].state;
            _this.log('State is: %s', state);
            callback(null, state === 'on');
        }).catch(function (error) {
            _this.log('Error on getting state: %s', error.message);
            callback(error);
        });
    };
    PilightHttpAccessory.prototype.setPowerState = function (powerState, callback) {
        var _this = this;
        var state;
        if (powerState)
            state = 'on';
        else
            state = 'off';
        WebRequest.get(this.powerUrl + state)
            .then(function () {
            _this.log('toggle power succeeded', '');
            callback();
        }).catch(function (error) {
            _this.log("Power on failed: %s", error.message);
            callback(error);
        });
    };
    return PilightHttpAccessory;
}());
exports.PilightHttpAccessory = PilightHttpAccessory;
//# sourceMappingURL=PilightHttpAccessory.js.map