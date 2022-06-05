'use strict';
exports.__esModule = true;
exports.advancedConsoleLog = void 0;
var advancedConsoleLog = /** @class */ (function () {
    function advancedConsoleLog(name, color, initOnConstruct) {
        if (color === void 0) {
            color = brandOrange;
        }
        if (initOnConstruct === void 0) {
            initOnConstruct = false;
        }
        this.shouldLog = false;
        this.instanceName = name;
        this.shouldLog = initOnConstruct;
        this.instanceColor = color;
    }
    advancedConsoleLog.prototype.initialize = function (silent) {
        if (silent === void 0) {
            silent = false;
        }
        this.shouldLog = true;
        if (silent) return;
        console.log(
            '%c☄ %cDebugger [' +
                this.instanceName +
                ']%c ✔ Instance has been enabled sucessfully',
            'font-size: 110%; background-color: '
                .concat(brandGray, '; color: ')
                .concat(
                    this.instanceColor,
                    '; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;',
                ),
            'font-size: 110%; background-color: '
                .concat(brandGray, '; color: ')
                .concat(
                    brandBlue,
                    '; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0;',
                ),
            'font-size: 110%; color: '.concat(brandGreen, '; padding: 0 5px'),
        );
    };
    advancedConsoleLog.prototype.terminate = function (silent) {
        if (silent === void 0) {
            silent = false;
        }
        this.shouldLog = false;
        if (silent) return;
        console.log(
            '%c☄ %cDebugger [' +
                this.instanceName +
                ']%c ✗ Instance has been disabled',
            'font-size: 110%; background-color: '
                .concat(brandGray, '; color: ')
                .concat(
                    this.instanceColor,
                    '; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;',
                ),
            'font-size: 110%; background-color: '
                .concat(brandGray, '; color: ')
                .concat(
                    brandBlue,
                    '; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0;',
                ),
            'font-size:110%; color: '.concat(brandRed, '; padding: 0 5px'),
        );
    };
    advancedConsoleLog.prototype.log = function (message, type) {
        if (!this.shouldLog) return;
        switch (type) {
            default:
            case 'information':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c 🛈%c' + message,
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            this.instanceColor,
                            '; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            brandBlue,
                            '; font-weigt: bold; padding: 5px 0 5px 0;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            blue,
                            '; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px',
                        ),
                    'font-size: 110%; color: '.concat(blue),
                );
                break;
            case 'error':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c ✗%c' + message,
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            this.instanceColor,
                            '; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            brandBlue,
                            '; font-weigt: bold; padding: 5px 0 5px 0;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            red,
                            '; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px',
                        ),
                    'font-size: 110%; color: '.concat(red),
                );
                break;
            case 'sucess':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c ✔%c' + message,
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            this.instanceColor,
                            '; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            brandBlue,
                            '; font-weigt: bold; padding: 5px 0 5px 0;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            green,
                            '; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px',
                        ),
                    'font-size: 110%; color: '.concat(green),
                );
                break;
            case 'warning':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c !%c' + message,
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            this.instanceColor,
                            '; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            brandBlue,
                            '; font-weigt: bold; padding: 5px 0 5px 0;',
                        ),
                    'font-size: 110%; background-color: '
                        .concat(brandGray, '; color: ')
                        .concat(
                            orange,
                            '; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px',
                        ),
                    'font-size: 110%; color: '.concat(orange),
                );
                break;
        }
    };
    return advancedConsoleLog;
})();
exports.advancedConsoleLog = advancedConsoleLog;
// Variables
var brandBlue = 'rgb(47, 164, 255)';
var brandGray = 'rgb(44, 46, 67)';
var brandGreen = 'rgb(107, 203, 119)';
var brandOrange = 'rgb(228, 88, 38)';
var brandRed = 'rgb(255, 24, 24)';
var brandWhite = 'rgb(255, 255, 255)';
var blue = 'rgb(0, 180, 216)';
var green = 'rgb(84, 227, 70)';
var red = 'rgb(255, 24, 24)';
var orange = 'rgb(255, 142, 0)';
