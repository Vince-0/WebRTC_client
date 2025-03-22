// DOM Elements
const sipUriInput = document.getElementById('sipUri');
const connectBtn = document.getElementById('connectBtn');
const callBtn = document.getElementById('callBtn');
const hangupBtn = document.getElementById('hangupBtn');
const statusDiv = document.getElementById('status');
const remoteAudio = document.getElementById('remoteAudio');

// SIP.js User Agent
let simpleUser;
const wsServer = 'wss://your-sip-server.com'; // Replace with your SIP WebSocket server

// Event Listeners
connectBtn.addEventListener('click', handleConnect);
callBtn.addEventListener('click', handleCall);
hangupBtn.addEventListener('click', handleHangup);

async function handleConnect() {
    try {
        const options = {
            aor: sipUriInput.value,
            media: {
                constraints: { audio: true, video: false },
                remote: { audio: remoteAudio }
            }
        };

        simpleUser = new SIP.Web.SimpleUser(wsServer, options);
        await simpleUser.connect();
        
        updateStatus('Connected');
        connectBtn.disabled = true;
        callBtn.disabled = false;
        
        // Handle incoming calls
        simpleUser.delegate = {
            onCallReceived: () => {
                updateStatus('Incoming Call');
                // Add your incoming call handling logic here
            }
        };
    } catch (error) {
        console.error('Connection failed:', error);
        updateStatus('Connection Failed');
    }
}

async function handleCall() {
    try {
        await simpleUser.call(sipUriInput.value);
        updateStatus('Call in Progress');
        callBtn.disabled = true;
        hangupBtn.disabled = false;
    } catch (error) {
        console.error('Call failed:', error);
        updateStatus('Call Failed');
    }
}

async function handleHangup() {
    try {
        await simpleUser.hangup();
        updateStatus('Call Ended');
        callBtn.disabled = false;
        hangupBtn.disabled = true;
    } catch (error) {
        console.error('Hangup failed:', error);
    }
}

function updateStatus(message) {
    statusDiv.textContent = message;
}
