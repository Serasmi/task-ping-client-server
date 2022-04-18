Node.js application emulates requests from client to unstable server.

**Client** is Node.js app. Client periodically sends request to url and measure its ping duration.
You can configure url in config file.<br />
After calculating ping value client sends it to the report server.
If the report server does not respond, client tries to send metric again by exponential backoff delay.

**Report Server** is Node.js app. It receives metric messages by REST api on /data endpoint.<br />
Server implements QoS. You can configure in config file.

Both client and server store working data and log information to the console.<br />
After stopping any app, statistic logs will be printed to the console.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run dev:client`

Runs the **client** app in the development mode.<br />
First you need to run the **server** app. Otherwise, the **client** app will crash.

The app will reload if you make edits.

### `npm run dev:server`

Runs the **server** app in the development mode.<br />

The app will reload if you make edits.

### `npm run start:client`

Runs the **client** app in the production mode.<br />
First you need to build app and run the **server** app. Otherwise, the **client** app will crash.

### `npm run start:server`

Runs the **server** app in the production mode.<br />
First you need to build app.
