# WebRTC SIP Client Application

Author [https://github.com/Vince-0](https://github.com/Vince-0/Projects)

Use at your own risk.

A WebRTC client application built with [SIP.js](https://sipjs.com/]v0.21.2) for handling SIP-based audio calls through a WebSocket server.

Connects to a WebSocket server like this FreeSWITCH configuration: https://github.com/Vince-0/FreeSWITCH_WEBRTC

## Features

- SIP registration and authentication with automatic renewal
- Audio calls (outbound and inbound)
- Call controls (answer, reject, hangup)
- Secure WebSocket (WSS) support
- STUN/ICE support for NAT traversal
- Real-time status updates

<p align="center">
<img src="https://github.com/Vince-0/WebRTC_client/blob/b13e2ac81a3157616f54b9af136da798dfaa6452/Screenshot%202025-03-25%20215643.png" />
</p>


## Directory Structure

```
webrtc-client/
├── certs/                  # SSL certificates
│   ├── cert.pem           # SSL certificate
│   └── key.pem            # Private key
├── public/                # Static files
│   ├── css/              # Stylesheets
│   │   └── style.css     # Main stylesheet
│   └── js/               # JavaScript files
│       ├── sip-0.21.2.min.js  # SIP.js library (minified)
│       └── sip-client.js      # Client implementation
├── src/                   # Server-side code
│   └── server.js         # HTTPS server setup
├── views/                # HTML templates
│   └── index.html       # Main application interface
└── package.json         # Project configuration
```

## Prerequisites

- Node.js installed on your system
- A SIP server with WebSocket support
- Modern web browser with WebRTC support

## Installation

1. Clone the repository or copy the project files
2. Navigate to the project directory:
   ```bash
   cd webrtc-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## SSL Certificate Configuration

WebRTC requires a secure context (HTTPS) to access media devices. You have three options:

1. **Development (Self-signed certificates)**:
   ```bash
   # Generate self-signed certificates
   npm run generate-certs
   ```
   This will create:
   - `certs/key.pem`: Private key
   - `certs/cert.pem`: Self-signed certificate

2. **Production (Using your own certificates)**:
   - Place your SSL certificate files in the `certs` directory:
     - `certs/key.pem`: Your private key
     - `certs/cert.pem`: Your SSL certificate

3. **Local Development**:
   - Use localhost (considered secure by browsers)
   - Access via https://localhost:3001

## Configuration

### SIP Server Settings

The application provides a user interface for configuring:

1. **Connection Settings**:
   - SIP Server: Your SIP server domain
   - WebSocket URL: WebSocket server URL (e.g., wss://sip.example.com:8089/ws)
   - Username: Your SIP account username
   - Password: Your SIP account password
   - Display Name: Your display name (optional)

2. **Registration Options** (in sip-client.js):
   ```javascript
   registererOptions: {
       expires: 300,            // Registration expiry in seconds
       refreshFrequency: 90,    // Refresh registration every 90 seconds
       extraHeaders: [...]      // Additional SIP headers
   }
   ```

### Media Configuration

```javascript
media: {
    constraints: { 
        audio: true,    // Audio-only calls
        video: false    // No video support
    },
    remote: {
        audio: remoteAudio  // Remote audio element
    },
    local: {
        audio: localAudio   // Local audio element (muted)
    }
}
```

### ICE/STUN Configuration

```javascript
sessionDescriptionHandlerFactoryOptions: {
    peerConnectionConfiguration: {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },  // Google's public STUN server
            // Add your TURN servers here if needed
            // {
            //     urls: 'turn:turn.example.com:3478',
            //     username: 'username',
            //     credential: 'password'
            // }
        ],
        iceTransportPolicy: 'all',      // Use 'relay' to force TURN
        iceCandidatePoolSize: 0,        // Increase for faster connectivity
        bundlePolicy: 'balanced'        // Use 'max-bundle' for better performance
    }
}
```

This configuration is essential for:
- NAT traversal using STUN/TURN servers
- ICE candidate gathering and connectivity
- Establishing peer-to-peer connections
- Fallback options for difficult network scenarios

For production environments, it's recommended to:
1. Use your own STUN/TURN servers
2. Configure multiple ICE servers for redundancy
3. Consider using a TURN server for reliable connectivity
4. Adjust ICE parameters based on your network requirements

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. Access the application:
   ```
   https://localhost:3001
   ```
   Note: Accept the security warning if using self-signed certificates

## Usage

### Connection and Registration

1. Enter your SIP server details and credentials
2. Click "Connect" to establish connection
3. The client will automatically:
   - Connect to the WebSocket server
   - Register with the SIP server
   - Maintain registration with periodic refreshes
   - Update status display

### Making Calls

1. Enter the destination in one of these formats:
   - Extension number: `1003`
   - Full SIP URI: `1003@domain.com`
2. Click "Call" to initiate the call
3. Use "Hang Up" to end the call

### Receiving Calls

1. When receiving a call:
   - Status will show "Incoming call..."
   - Click "Answer" to accept
   - Click "Reject" to decline
2. Use "Hang Up" to end an active call

## Security Considerations

1. **HTTPS Requirement**:
   - WebRTC requires HTTPS
   - Use valid SSL certificates in production
   - Self-signed certificates only for development

2. **SIP Security**:
   - Use WSS (WebSocket Secure) for signaling
   - Credentials are only stored in memory
   - Registration is automatically renewed

3. **Media Security**:
   - Audio is encrypted using SRTP
   - ICE/STUN for NAT traversal
   - Secure key exchange via DTLS

## Troubleshooting

1. **Connection Issues**:
   - Verify WebSocket URL format (should start with wss://)
   - Check SSL certificate validity
   - Confirm SIP server is reachable
   - Check browser console for errors

2. **Registration Problems**:
   - Verify credentials
   - Check registration status in UI
   - Monitor registration refresh cycles
   - Check server logs for authentication issues

3. **Call Problems**:
   - Check audio device permissions
   - Verify ICE connectivity
   - Monitor browser console for errors
   - Check SIP server logs

4. **Media Issues**:
   - Allow microphone access when prompted
   - Check browser audio settings
   - Verify STUN/TURN configuration
   - Check audio routing settings

## Browser Support

Tested and working in:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

## Development

### Key Files

1. **sip-client.js**:
   - SIP.js implementation
   - Call handling
   - Registration management
   - Event handling

2. **server.js**:
   - HTTPS server
   - Static file serving
   - SSL certificate handling

3. **index.html**:
   - User interface
   - Audio elements
   - Control buttons
   - Status display

### Key Functions

1. **Connection Management**:
   - `connect()`: Establish connection
   - `disconnect()`: Clean disconnection
   - `register()`: SIP registration
   - `unregister()`: SIP unregistration

2. **Call Management**:
   - `makeCall()`: Initiate calls
   - `answer()`: Answer incoming calls
   - `reject()`: Reject incoming calls
   - `hangup()`: End active calls

3. **Event Handling**:
   - Connection events
   - Registration events
   - Call events
   - Media events

## License

This project is licensed under the [MIT License](https://mit-license.org/). 
