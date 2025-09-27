# WebSocket Chat Server (TypeScript)

This project is a simple WebSocket-based chat server built using the [ws](https://github.com/websockets/ws) library in Node.js and TypeScript. It allows multiple users to join specific chat rooms and exchange messages in real time.

## Features

* Users can join a chat room by sending a `join` event with the room ID.
* Users can send messages to all participants in the same room using the `chat` event.
* When a user disconnects, their socket is removed from the active connection list.
* Written in **TypeScript** with type safety for sockets and user management.

## Installation

1. Clone the repository or copy the project files.
2. Install dependencies:

   ```bash
   npm install ws typescript ts-node @types/ws
   ```
3. Run the server with ts-node:

   ```bash
   npx ts-node index.ts
   ```

   Or compile and run:

   ```bash
   npx tsc
   node dist/index.js
   ```

## Code Overview

* **WebSocketServer**: Listens on port `8080` for incoming WebSocket connections.
* **User Interface**: Defines the `User` type with `socket: WebSocket` and `room: string`.
* **allsocket**: Stores all connected users along with their rooms.
* **Events**:

  * `join`: Adds the user to a specific room.
  * `chat`: Broadcasts the message to all users in the same room.
  * `close`: Removes the user from the active connection list when they disconnect.

## Example Message Format

* Join a room:

  ```json
  {
    "type": "join",
    "payload": {
      "roomId": "room1"
    }
  }
  ```
* Send a chat message:

  ```json
  {
    "type": "chat",
    "payload": {
      "message": "Hello everyone!"
    }
  }
  ```

## Notes

* The server does not include authentication or message persistence.
* Each client must send properly structured JSON messages.
* By default, the server runs on `ws://localhost:8080`.

---
