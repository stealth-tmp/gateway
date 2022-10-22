import P2PCF from './modules/p2pcf.js';

(() => {
    let loc_hash = window.location.hash;
    if (!loc_hash) {
        console.error('Missing hash specs, using test room hash');
        loc_hash = 'test';
    }
    const client_id = 'MyUsername';
    const room_id = loc_hash;
    const p2pcf = new P2PCF(client_id, room_id);
    console.log('loc_hash room_id', loc_hash);
    window.p2pcf = p2pcf;
})();
