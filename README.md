# stream-json-to-browser

Run `npm install` to install all node modules.

Create a file called `.env` to set the environment variables including username and password.

The `.env` file should look like this:
```
export MQTT_APP_ID=username
export MQTT_APP_ACCESS_KEY=password
```

Run the server by running the `run` script. If an argument is provided it is interpreted as the ID of the device to subscribe to.
