import deepParser from '../utils/deepParser';
import { WebSocketServer } from 'ws';
import userAuth from './userAuth';
import gameRoom from './gameRoom';
import gameShips from './gameShips';
import gameAddUserToRoom from './gameAddUserToRoom';
import generateResponse from '../utils/generateResponse';

const sockets = new Map();
let socketID = 0;

const initWebSocet = () => {
  const WS_SERVER = new WebSocketServer({ port: 3000 });
  WS_SERVER.on('connection', (ws) => {
    const currentSocketID = socketID++;
    sockets.set(currentSocketID, ws);

    ws.on('message', (requests) => {
      const requestsObj = deepParser(requests.toString());

      if (requestsObj.type === 'reg') {
        const response = userAuth(requestsObj, currentSocketID);
        ws.send(JSON.stringify(response));
      }
      if (requestsObj.type === 'add_ships') {
        const response = gameShips(requestsObj);
        ws.send(JSON.stringify(response));
      }
      if (requestsObj.type === 'create_room') {
        const response = gameRoom(currentSocketID);
        WS_SERVER.clients.forEach((client) => {
          client.send(JSON.stringify(response));
        });
      }
      if (requestsObj.type === 'add_user_to_room') {
        const response = gameAddUserToRoom(requestsObj, currentSocketID);
        WS_SERVER.clients.forEach((client) => {
          sockets.forEach((socket, key) => {
            if ((key === response.data.idGame || key === response.data.idPlayer) && socket === client) {
              client.send(generateResponse(response));
            }
          });
          client.send(JSON.stringify(gameRoom()));
        });
      }
    });
  });
};

export default initWebSocet;
