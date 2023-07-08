import deepParser from '../utils/deepParser';
import { WebSocketServer } from 'ws';
import userAuth from './userAuth';
import gameRoom from './gameRoom';
import gameShips from './gameShips';
import users from './users';

const sockets = new Map();
let socketID = 0;

const initWebSocet = () => {
  const WS_SERVER = new WebSocketServer({ port: 3000 });
  WS_SERVER.on('connection', (ws) => {
    const currentSocketID = socketID++;
    sockets.set(currentSocketID, ws);

    ws.on('message', (requests) => {
      const requestsObj = deepParser(requests.toString());

      console.log(WS_SERVER.clients.size);

      if (requestsObj.type === 'reg') {
        const response = userAuth(requestsObj, currentSocketID);
        ws.send(JSON.stringify(response));
      }
      if (requestsObj.type === 'add_ships') {
        const responce = gameShips(requestsObj);
        ws.send(JSON.stringify(responce));
      }
      console.log(users);

      WS_SERVER.clients.forEach((client) => {
        if (requestsObj.type === 'create_room') {
          const response = gameRoom(requestsObj, currentSocketID);
          client.send(JSON.stringify(response));
        }
      });
    });
  });
};

export default initWebSocet;
