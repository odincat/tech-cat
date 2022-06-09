export const colors = {
    black: '#000000',
    blue: '#1597E5',
    gray: '#212121',
    green: '#22c55e',
    white: '#fefffe',
    yellow: '#eab308'
};

export const fonts = {
    primary: `'Roboto', sans-serif`,
    secondary: `'Maven Pro', sans-serif`
};

type Device = 'small' | 'medium' | 'large';

export const responsive = (device: Device) => {
    var minResolution: string;

    switch(device) {
        case 'small':
            minResolution = '560px';
        break;

        case 'medium':
            minResolution = '992px';
        break;

        case 'large':
            minResolution = '1200px';
        break;
    }

    return `@media only screen and (max-width: ${minResolution})`;
};