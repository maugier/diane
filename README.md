# Diane

Artemis clone with HTML5, NodeJS, and Socket.io

Very early development stage - not useable yet !

The goal of this project is to allow people at LAN parties or private events
to play quick games, without having to install software on every machine, 
and allow all possible kind of devices (tablets, phones, ...)

For now, Canvas graphics only, hopefully a WebGL bridge view for the future.

## Demo

- Pull the deps, then run the server:

```
npm install
node diane.js
```

- Open a browser window to http://localhost:3000/ (this is the simulation controls)
- Open a second browser to http://localhost:3000/helm?Artemis
- Open a third browser to http://localhost:3000/helm?Diane
- Click "run" in the first window. 
- Use the slider to set the speed. Click in the radar window to change bearing.

That's it for now.. I've only been working on this for a single day !


## Development

All simulation is written in JS. The world state is a dumb object without methods, and the simulation
occurs on an external function. That allows the server to send the current state of the world to clients
if/when needed.

For now, the server sends the full world state to all clients. Because the simulation is deterministic, we
can also allow the clients to load the simulation code, and let them run the simulation when no actions occur.
To this effect, the server can send short `tick` messages, asking the clients to run a simulation step themselves.
We can enable this when we are reasonably confident the simulation works well, if network throughput ever becomes a problem.

So far, absolutely no authentication or authorization, anyone can access everything by hitting the right URL. We should make
an optional access control mechanism available, where players login to a lobby, and the game master allocates players to stations.

## TODO

- Architecture
  - Subwindows as js snippets
  - Different socket namespaces for connection types
  - Restrict information sent to clients ?

- Weapons
  - Weapons behaviour modeling
  - Weapons officier station
  - Beam arc display on radar

- Simulation
  - Collisions
  - Energy management
  - Cargo management ?
  - Scripted missions ? provide JS environment for it

- Lobby
  - Game lobby, chat, allow player to choose nickname
  - Allow game master to form crews, crew captain to assign stations ?
  - Open links to game consoles in new windows

