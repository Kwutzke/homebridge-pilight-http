*The repository is still under development, the implemented features
working stable, but the features are limited.
At this point of development you can register and
control pilight switches and read their states.*

*For future release it is planned, to implement the type 'lamp' with
brightness control and registration as a platform, with automated
config read*
# hombridge-pilight-http
Homebridge plugin to control lights and switches over the pilight rest
api.



## Installation
Follow these [instruction](https://github.com/nfarina/homebridge) for
the homebridge server installation. The plugin is published
through [NPM](https://www.npmjs.com/package/homebridge-pilight-http) and
should be installed "globally" by typing:
~~~js
npm install -g homebridge-pilight-http
~~~

## Configuration



Configuration sample:

~~~json
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },
    "description": "All pilight accesories",
    "accessories": [
        {
            "accessory": "PilightHttp",
            "name": "Front Left",
            "host": "localhost",
            "port": "5001",
            "deviceName": "livingFrontLeftLamp",
            "type": "Switch"
        },
    ],
    "platforms": []
 }
~~~
