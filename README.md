# Diane

Artemis clone with HTML5, NodeJS, and Socket.io

Very early development stage - not useable yet !

The goal of this project is to allow people at LAN parties or private events
to play quick games, without having to install software on every machine, 
and allow all possible kind of devices (tablets, phones, ...)

For now, Canvas graphics only, hopefully a WebGL bridge view for the future.

## Demo

- Pull the deps, then run the server:

    npm install
    node diane.js

- Open a browser window to http://localhost:3000/ (this is the simulation controls)
- Open a second browser to http://localhost:3000/helm?Artemis
- Open a third browser to http://localhost:3000/helm?Diane
- Click "start" in the first window. 
- Use the slider to set the speed. Click in the radar window to change bearing.

That's it for now.. I've only been working on this for a single day !


## Development

So far, absolutely no authentication or authorization, anyone can access everything.
