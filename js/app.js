import * as P2PCF from './libs/dist/p2pcf.min.js';

(function () {
    const client_id = 'MyUsername';
    const room_id = 'MyRoom';
    window.P2PCF = P2PCF;
    const p2pcf = new P2PCF('abc', '123');
    console.log('p2pcf', p2pcf);
})();
