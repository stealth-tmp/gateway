import P2PCF from './modules/p2pcf.js';
let room;
let username;

const addMessage = (message) => {
    const messageEl = document.createElement('div');
    messageEl.innerText = message;
    messages.appendChild(messageEl);
};

const go = () => {
    divUserName.innerText = 'username: ' + username;
    divRoomName.innerText = 'roomname: ' + room;
    divSessionId.innerText = 'session short id: ' + p2pcf.sessionId.substring(0, 5);

    sendButton.addEventListener('click', () => {
        addMessage(p2pcf.sessionId + ': ' + msgContent.value);
        p2pcf.broadcast(new TextEncoder().encode(msgContent.value));
        msgContent.value = '';
    });
    p2pcf.on('peerconnect', (peer) => {
        console.log('Peer connect', peer.id, peer);
    });
};

(() => {
    let loc_hash = window.location.hash;
    if (!loc_hash) {
        console.error('Missing hash specs, using test room hash');
        loc_hash = 'testABCD123';
    }
    username = 'user-' + Math.floor(Math.random() * 100000);
    room = loc_hash;
    const p2pcf = new P2PCF(username, room);
    console.log('loc_hash room_id', loc_hash);
    window.p2pcf = p2pcf;
    p2pcf.on('msg', (peer, data) => {
        addMessage(peer.id.substring(0, 5) + ': ' + new TextDecoder('utf-8').decode(data));
    });
})();

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    go();
} else {
    window.addEventListener('DOMContentLoaded', go, { once: true });
}
