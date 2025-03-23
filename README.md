# WebRTC SIP Client Application

A WebRTC client application built with SIP.js v0.21.2 for handling SIP-based audio calls through a WebSocket server.

## Directory Structure

```
webrtc-client/
├── public/
│   ├── css/
│   │   └── style.css          # Application styling
│   ├── js/
│   │   ├── app.js            # Client-side application logic
│   │   └── sip-0.21.2.min.js # SIP.js library
├── src/
│   └── server.js             # Express server setup
├── views/
│   └── index.html            # Main application interface
└── package.json              # Project dependencies
```

## Features

- SIP registration and authentication
- Audio calls (outbound and inbound)
- Call controls (answer, reject, hangup)
- Secure WebSocket (WSS) support
- STUN/ICE support for NAT traversal
- Real-time status updates
- Automatic registration renewal

## Prerequisites

- Node.js installed on your system
- A SIP server with WebSocket support
- Modern web browser with WebRTC support
- SSL/TLS certificates for HTTPS (required for WebRTC in production)

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
   - Update the server configuration if using different filenames

3. **Local Development**:
   - Use localhost (considered secure by browsers)
   - No certificates needed when using `localhost`

## Configuration

### SIP Server Settings

1. **Server Configuration**:
   - SIP Server: Your SIP server domain
   - WebSocket URL: WebSocket server URL (e.g., wss://sip.example.com:7443/ws)
   - Username: Your SIP account username
   - Password: Your SIP account password
   - Display Name: Your display name (optional)

2. **Registration Settings** (in sip-client.js):
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
    }
}
```

### ICE/STUN Configuration

```javascript
sessionDescriptionHandlerFactoryOptions: {
    peerConnectionConfiguration: {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    }
}
```

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

### Making Calls

1. Enter the destination in one of these formats:
   - Extension number: `1003`
   - Full SIP URI: `1003@domain.com`
2. Click "Call" to initiate the call
3. Use "Hang Up" to end the call

### Receiving Calls

1. When receiving a call:
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
   - Keep credentials secure
   - Implement proper authentication

3. **Media Security**:
   - Audio is encrypted using SRTP
   - ICE/STUN for NAT traversal
   - Secure key exchange via DTLS

## Troubleshooting

1. **Connection Issues**:
   - Verify WebSocket URL format
   - Check SSL certificate validity
   - Confirm SIP server is reachable

2. **Registration Problems**:
   - Verify credentials
   - Check registration status in console
   - Monitor registration refresh cycles

3. **Call Problems**:
   - Check audio device permissions
   - Verify ICE connectivity
   - Monitor browser console for errors

4. **Media Issues**:
   - Allow microphone access
   - Check audio settings
   - Verify STUN/TURN configuration

## Browser Support

- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

## Development Notes

1. **Code Structure**:
   - `server.js`: HTTPS server setup
   - `sip-client.js`: SIP client implementation
   - `index.html`: User interface
   - `style.css`: Styling

2. **Key Functions**:
   - `connect()`: Establish connection
   - `register()`: SIP registration
   - `unregister()`: SIP unregistration
   - `makeCall()`: Initiate calls
   - `answer()`: Handle incoming calls

3. **Event Handling**:
   - Connection events
   - Registration events
   - Call events
   - Media events

## License

This project is licensed under the MIT License. 