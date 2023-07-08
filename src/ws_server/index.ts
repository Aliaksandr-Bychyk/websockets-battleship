import deepParser from '../utils/deepParser';
import { WebSocketServer } from 'ws';
import userAuth from './userAuth';
import gameRoom from './gameRoom';

const initWebSocet = () => {
  const WS_SERVER = new WebSocketServer({ port: 3000 });
  WS_SERVER.on('connection', (ws) => {
    ws.on('message', (requests) => {
      const requestsObj = deepParser(requests.toString());

      console.log(requestsObj);

      if (requestsObj.type === 'reg') {
        const response = userAuth(requestsObj);
        ws.send(JSON.stringify(response));
      }
      if (requestsObj.type === 'create_room') {
        const response = gameRoom(requestsObj);
        ws.send(JSON.stringify(response));
      }
      /*else {
        ws.send(
          JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({
              idGame: 1,
              idPlayer: 1,
            }),
            id: 0,
          }),
        );
      }*/
    });
  });
};

export default initWebSocet;
