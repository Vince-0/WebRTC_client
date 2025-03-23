// DOM Elements
const sipServerInput = document.getElementById('sipServer');
const wsServerInput = document.getElementById('wsServer');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const displayNameInput = document.getElementById('displayName');
const sipUriInput = document.getElementById('sipUri');
const connectBtn = document.getElementById('connectBtn');
const callBtn = document.getElementById('callBtn');
const hangupBtn = document.getElementById('hangupBtn');
const statusDiv = document.getElementById('status');
const remoteAudio = document.getElementById('remoteAudio');

// SIP.js User Agent
let simpleUser;

// Event Listeners
connectBtn.addEventListener('click', handleConnect);
callBtn.addEventListener('click', handleCall);
hangupBtn.addEventListener('click', handleHangup);

function getSipConfiguration() {
    const sipServer = sipServerInput.value.trim();
    const wsServer = wsServerInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const displayName = displayNameInput.value.trim();

    // Validate required fields
    if (!sipServer || !wsServer || !username) {
        throw new Error('SIP Server, WebSocket URL, and Username are required');
    }

    // Construct the SIP URI
    const sipUri = `sip:${username}@${sipServer}`;

    return {
        sipUri,
        wsServer,
        displayName,
        authorizationUser: username,
        password
    };
}

async function handleConnect() {
    try {
        const config = getSipConfiguration();

        const options = {
            aor: config.sipUri,
            media: {
                constraints: { audio: true, video: false },
                remote: { audio: remoteAudio }
            },
            userAgentOptions: {
                displayName: config.displayName,
                authorizationUser: config.authorizationUser,
                password: config.password,
                uri: config.sipUri,
                transportOptions: {
                    server: config.wsServer
                }
            }
        };

        simpleUser = new SIP.Web.SimpleUser(config.wsServer, options);
        
        updateStatus('Connecting...');
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
        updateStatus(`Connection Failed: ${error.message}`);
    }
}

async function handleCall() {
    try {
        const destinationUri = sipUriInput.value.trim();
        if (!destinationUri) {
            throw new Error('Destination SIP URI is required');
        }

        await simpleUser.call(destinationUri);
        updateStatus('Call in Progress');
        callBtn.disabled = true;
        hangupBtn.disabled = false;
    } catch (error) {
        console.error('Call failed:', error);
        updateStatus(`Call Failed: ${error.message}`);
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
        updateStatus(`Hangup Failed: ${error.message}`);
    }
}

function updateStatus(message) {
    statusDiv.textContent = message;
}
