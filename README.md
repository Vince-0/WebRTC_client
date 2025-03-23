# WebRTC Client Application

A simple WebRTC client application built with SIP.js for handling audio calls through a SIP server.

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

## Prerequisites

- Node.js installed on your system
- A SIP WebSocket server (like Asterisk or FreeSWITCH)
- Modern web browser with WebRTC support
- Valid SIP account credentials

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

## Configuration

The application now includes a configuration panel where you can enter your SIP settings:

1. **SIP Server Settings**:
   - SIP Server: Your SIP server domain (e.g., example.com)
   - WebSocket URL: WebSocket server URL (e.g., wss://example.com:7443/ws)
   - Username: Your SIP account username
   - Password: Your SIP account password
   - Display Name: Your name to display to other users

2. **Required Fields**:
   - SIP Server
   - WebSocket URL
   - Username

3. **Security Note**: The application handles credentials securely and only uses them for SIP authentication.

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. Access the application in your web browser at:
   ```
   http://localhost:3000
   ```

## Features

- Audio-only calls (can be extended to support video)
- Simple, intuitive user interface
- Real-time connection status display
- SIP account configuration panel
- Basic call controls:
  - Connect to SIP server with authentication
  - Make outbound calls
  - Hang up calls
- Incoming call handling capability

## Dependencies

- Express.js (^4.18.2) - Web application framework
- SIP.js (^0.21.2) - WebRTC and SIP signaling library

## Usage

1. Enter your SIP server configuration details in the configuration panel
2. Click "Connect" to establish connection with the SIP server
3. Once connected, the "Call" button will be enabled
4. Enter the destination SIP URI and click "Call" to initiate a call
5. Use the "Hang Up" button to end the active call

## Browser Support

This application works in all modern browsers that support WebRTC:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Security Notes

- Ensure your SIP server uses secure WebSocket connections (WSS)
- Never expose sensitive credentials in client-side code
- Implement proper authentication mechanisms on your SIP server
- Use HTTPS in production to protect user credentials
- Credentials are only stored in memory during the session

## Troubleshooting

If you encounter issues:
1. Check browser console for error messages
2. Verify SIP server connection settings
3. Ensure WebRTC is enabled in your browser
4. Check if your SIP server is properly configured for WebSocket connections
5. Verify your SIP account credentials are correct
6. Ensure your SIP server supports WebSocket connections 