export class advancedConsoleLog {
    instanceName: string;
    instanceColor: string;
    shouldLog: boolean = false;

    constructor(
        name: string,
        color: string = brandOrange,
        initOnConstruct: boolean = false,
    ) {
        this.instanceName = name;
        this.shouldLog = initOnConstruct;
        this.instanceColor = color;
    }

    initialize(silent: boolean = false) {
        this.shouldLog = true;
        if (silent) return;
        console.log(
            '%c☄ %cDebugger [' +
                this.instanceName +
                ']%c ✔ Instance has been enabled sucessfully',
            `font-size: 110%; background-color: ${brandGray}; color: ${this.instanceColor}; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;`,
            `font-size: 110%; background-color: ${brandGray}; color: ${brandBlue}; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0;`,
            `font-size: 110%; color: ${brandGreen}; padding: 0 5px`,
        );
    }

    terminate(silent: boolean = false) {
        this.shouldLog = false;
        if (silent) return;
        console.log(
            '%c☄ %cDebugger [' +
                this.instanceName +
                ']%c ✗ Instance has been disabled',
            `font-size: 110%; background-color: ${brandGray}; color: ${this.instanceColor}; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;`,
            `font-size: 110%; background-color: ${brandGray}; color: ${brandBlue}; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0;`,
            `font-size:110%; color: ${brandRed}; padding: 0 5px`,
        );
    }

    log(message: string, type: logType) {
        if (!this.shouldLog) return;

        switch (type) {
            default:
            case 'information':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c 🛈%c' + message,
                    `font-size: 110%; background-color: ${brandGray}; color: ${this.instanceColor}; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${brandBlue}; font-weigt: bold; padding: 5px 0 5px 0;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${blue}; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px`,
                    `font-size: 110%; color: ${blue}`,
                );
                break;

            case 'error':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c ✗%c' + message,
                    `font-size: 110%; background-color: ${brandGray}; color: ${this.instanceColor}; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${brandBlue}; font-weigt: bold; padding: 5px 0 5px 0;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${red}; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px`,
                    `font-size: 110%; color: ${red}`,
                );
                break;

            case 'sucess':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c ✔%c' + message,
                    `font-size: 110%; background-color: ${brandGray}; color: ${this.instanceColor}; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${brandBlue}; font-weigt: bold; padding: 5px 0 5px 0;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${green}; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px`,
                    `font-size: 110%; color: ${green}`,
                );
                break;

            case 'warning':
                console.log(
                    '%c☄ %c' + this.instanceName + '%c !%c' + message,
                    `font-size: 110%; background-color: ${brandGray}; color: ${this.instanceColor}; font-weigt: bold; padding: 5px 0 5px 5px; border-radius: 5px 0 0 5px;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${brandBlue}; font-weigt: bold; padding: 5px 0 5px 0;`,
                    `font-size: 110%; background-color: ${brandGray}; color: ${orange}; font-weigt: bold; padding: 5px 5px 5px 0; border-radius: 0 5px 5px 0; margin-right: 5px`,
                    `font-size: 110%; color: ${orange}`,
                );
                break;
        }
    }
}

type logType = 'information' | 'error' | 'sucess' | 'warning';

// Variables
const brandBlue = 'rgb(47, 164, 255)';
const brandGray = 'rgb(44, 46, 67)';
const brandGreen = 'rgb(107, 203, 119)';
const brandOrange = 'rgb(228, 88, 38)';
const brandRed = 'rgb(255, 24, 24)';
const brandWhite = 'rgb(255, 255, 255)';

const blue = 'rgb(0, 180, 216)';
const green = 'rgb(84, 227, 70)';
const red = 'rgb(255, 24, 24)';
const orange = 'rgb(255, 142, 0)';
